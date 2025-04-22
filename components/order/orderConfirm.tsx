import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Home,
  Clock,
  MapPin,
  CreditCard,
  Calendar,
  MessageSquare,
  Plus,
  Minus,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useOrderStore from "@/store/useOrderStore";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "../landing-page/hooks/use-toast";
import { useSession } from "next-auth/react";
import { HashLoader } from "react-spinners";

const OrderConfirm = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );
  const [activeTab, setActiveTab] = useState("delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    specialInstructions: "",
  });
  const [scheduledFor, setScheduledFor] = useState<string>("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0); // percentage
  const { toast: toastSuccess } = useToast();
  const {
    order,
    isLoading,
    error,
    setOrder,
    clearOrder,
    setIsLoading,
    setError,
  } = useOrderStore();

  const { data: session, status } = useSession();
  const navigate = useRouter();

  // Reset loading state on component mount
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  // Function to update item quantity
  const updateItemQuantity = (index: number, change: number) => {
    if (!order?.items) return;

    const newItems = [...order.items];
    const newQuantity = Math.max(1, newItems[index].quantity + change); // Minimum quantity is 1
    newItems[index] = { ...newItems[index], quantity: newQuantity };

    setOrder({
      ...order,
      items: newItems,
    });
  };

  // Function to validate and apply promo code
  const handleApplyPromoCode = () => {
    // Mock promo codes - in real app, this would be validated against a backend
    const promoCodes = {
      WELCOME10: 10,
      SPECIAL20: 20,
      FOOD50: 50,
    };

    const code = promoCode.toUpperCase();
    if (promoCodes[code as keyof typeof promoCodes]) {
      setPromoDiscount(promoCodes[code as keyof typeof promoCodes]);
      setAppliedPromoCode(code);
      toast.success(`Promo code ${code} applied successfully!`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Calculate prices based on order items
  const calculatePrices = () => {
    if (!order?.items || order.items.length === 0) {
      return {
        subtotal: 0,
        itemsDiscount: 0,
        promoDiscount: 0,
        deliveryFee: deliveryMethod === "delivery" ? 4.99 : 0,
        total: 0,
      };
    }

    // Calculate original subtotal before any discounts
    const subtotal = order.items.reduce((sum, item) => {
      return sum + item.unitPrice * item.quantity;
    }, 0);

    // Calculate items discount (from individual item discounts)
    const itemsDiscount = order.items.reduce((sum, item) => {
      if (item.menuItem.isDiscounted && item.menuItem.discount) {
        const itemTotal = item.unitPrice * item.quantity;
        const discountAmount = (itemTotal * item.menuItem.discount) / 100;
        return sum + discountAmount;
      }
      return sum;
    }, 0);

    // Calculate amount after item discounts
    const afterItemDiscounts = subtotal - itemsDiscount;

    // Calculate promo code discount
    const promoDiscountAmount = promoDiscount
      ? (afterItemDiscounts * promoDiscount) / 100
      : 0;

    // Calculate delivery fee
    const deliveryFee = deliveryMethod === "delivery" ? 4.99 : 0;

    // Calculate final total
    const total = afterItemDiscounts - promoDiscountAmount + deliveryFee;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      itemsDiscount: Number(itemsDiscount.toFixed(2)),
      promoDiscount: Number(promoDiscountAmount.toFixed(2)),
      deliveryFee: Number(deliveryFee.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  };

  const prices = calculatePrices();

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    if (!order) {
      setError("No order found");
      setIsSubmitting(false);
      return;
    }

    // Ensure all required fields are present
    const updatedOrder = {
      ...order,
      deliveryType: deliveryMethod,
      client: order.client || "",
      seller: order.seller || "",
      items: order.items || [],
      status: order.status || "pending",
      totalAmount: prices.total,
      paymentStatus: order.paymentStatus || "pending",
      createdAt: order.createdAt || new Date(),
      updatedAt: new Date(),
      // Add missing required fields for API
      paymentMethod,
      deliveryFee: deliveryMethod === "delivery" ? 4.99 : 0,
      // Add optional fields if provided
      deliveryAddress:
        deliveryMethod === "delivery" ? deliveryAddress : undefined,
      scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
      specialInstructions: specialInstructions || undefined,
      discountAmount: prices.itemsDiscount,
      // Add the quantity field
      quantity:
        order.items?.reduce((total, item) => total + item.quantity, 0) || 0,
    };

    setOrder(updatedOrder);

    try {
      const response = await axios.post("/api/order", updatedOrder);
      toastSuccess({ title: response.data.message });
      navigate.push("/order/success");
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to create order. Please try again.");
      toastSuccess({
        title: "Uh oh! Something went wrong.",
        description: "Failed to create order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!session) {
      navigate.push("/");
    }
  }, [session, navigate]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-30px)]">
        <HashLoader color="#ff6b00" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
                Almost There!
              </h1>
              <p className="text-lg text-gray-600">
                Choose your preferred delivery method and review your order
                details before confirming.
              </p>
            </div>

            {isSubmitting && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="animate-spin h-10 w-10 text-food-orange"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Processing Your Order
                  </h3>
                  <p className="text-gray-600">
                    Please wait while we confirm your order details...
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-food-orange" />
                  Choose Delivery Method
                </h2>
                <RadioGroup
                  defaultValue="delivery"
                  onValueChange={(value) => {
                    setDeliveryMethod(value as "delivery" | "pickup");
                    setActiveTab(value);
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div
                    className={`relative rounded-xl border-2 p-6 transition-all duration-300 cursor-pointer
                      ${deliveryMethod === "delivery" ? "border-food-orange bg-food-orangeLight/20" : "border-gray-200"}`}
                  >
                    <RadioGroupItem
                      value="delivery"
                      id="delivery"
                      className="absolute right-4 top-4"
                    />
                    <label htmlFor="delivery" className="cursor-pointer">
                      <div className="flex items-start">
                        <Truck className="h-10 w-10 text-food-orange shrink-0" />
                        <div className="ml-4">
                          <p className="font-semibold text-lg mb-1">
                            Home Delivery
                          </p>
                          <p className="text-gray-600">
                            Delivered within 30-45 minutes
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Enjoy the convenience of doorstep delivery with
                            real-time tracking
                          </p>
                          <p className="text-food-orange font-medium mt-2">
                            Delivery Fee: 4.99 TND
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div
                    className={`relative rounded-xl border-2 p-6 transition-all duration-300 cursor-pointer
                      ${deliveryMethod === "pickup" ? "border-food-orange bg-food-orangeLight/20" : "border-gray-200"}`}
                  >
                    <RadioGroupItem
                      value="pickup"
                      id="pickup"
                      className="absolute right-4 top-4"
                    />
                    <label htmlFor="pickup" className="cursor-pointer">
                      <div className="flex items-start">
                        <Home className="h-10 w-10 text-food-orange shrink-0" />
                        <div className="ml-4">
                          <p className="font-semibold text-lg mb-1">
                            Store Pickup
                          </p>
                          <p className="text-gray-600">
                            Ready in 15-20 minutes
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            Skip the queue and save on delivery fees with our
                            quick pickup service
                          </p>
                          <p className="text-food-orange font-medium mt-2">
                            Free
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Additional Information Tabs */}
              <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      value="delivery"
                      disabled={deliveryMethod !== "delivery"}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Address
                    </TabsTrigger>
                    <TabsTrigger value="scheduling">
                      <Calendar className="w-4 h-4 mr-2" />
                      Scheduling
                    </TabsTrigger>
                    <TabsTrigger value="order-details">
                      <Tag className="w-4 h-4 mr-2" />
                      Order Details
                    </TabsTrigger>
                  </TabsList>

                  {/* Delivery Address Tab */}
                  <TabsContent value="delivery" className="mt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            name="street"
                            value={deliveryAddress.street}
                            onChange={handleAddressChange}
                            placeholder="123 Main St"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={deliveryAddress.city}
                            onChange={handleAddressChange}
                            placeholder="New York"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={deliveryAddress.state}
                            onChange={handleAddressChange}
                            placeholder="NY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={deliveryAddress.zipCode}
                            onChange={handleAddressChange}
                            placeholder="10001"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            name="country"
                            value={deliveryAddress.country}
                            onChange={handleAddressChange}
                            placeholder="USA"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addressSpecialInstructions">
                          Delivery Instructions
                        </Label>
                        <Textarea
                          id="addressSpecialInstructions"
                          name="specialInstructions"
                          value={deliveryAddress.specialInstructions}
                          onChange={handleAddressChange}
                          placeholder="Leave at the door, call when arrived, etc."
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Scheduling Tab */}
                  <TabsContent value="scheduling" className="mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="scheduledFor">Schedule for Later</Label>
                        <Input
                          id="scheduledFor"
                          type="datetime-local"
                          value={scheduledFor}
                          onChange={(e) => setScheduledFor(e.target.value)}
                          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                        />
                        <p className="text-sm text-gray-500">
                          Leave empty for immediate delivery/pickup
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialInstructions">
                          Special Instructions
                        </Label>
                        <Textarea
                          id="specialInstructions"
                          value={specialInstructions}
                          onChange={(e) =>
                            setSpecialInstructions(e.target.value)
                          }
                          placeholder="Any special requests for your order?"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Order Details Tab */}
                  <TabsContent value="order-details" className="mt-4">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">
                          Manage Quantities
                        </h3>
                        {order?.items?.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border rounded-lg p-4"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {item.menuItem.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                <span
                                  className={
                                    item.menuItem.isDiscounted &&
                                    item.menuItem.discount
                                      ? "line-through text-gray-400"
                                      : ""
                                  }
                                >
                                  {formatCurrency(item.unitPrice)}
                                </span>
                                {item.menuItem.isDiscounted &&
                                  item.menuItem.discount && (
                                    <>
                                      <span className="ml-2">
                                        {formatCurrency(
                                          item.unitPrice *
                                            (1 - item.menuItem.discount / 100),
                                        )}
                                      </span>
                                      <span className="ml-2 text-green-600">
                                        ({item.menuItem.discount}% OFF)
                                      </span>
                                    </>
                                  )}
                                {" x "}
                                {item.quantity}
                              </p>
                              <p className="text-sm font-medium text-gray-700">
                                Subtotal:{" "}
                                {formatCurrency(
                                  item.quantity *
                                    item.unitPrice *
                                    (1 -
                                      (item.menuItem.isDiscounted &&
                                      item.menuItem.discount
                                        ? item.menuItem.discount / 100
                                        : 0)),
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateItemQuantity(index, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateItemQuantity(index, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Promo Code</h3>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="uppercase"
                          />
                          <Button
                            onClick={handleApplyPromoCode}
                            disabled={
                              !promoCode || appliedPromoCode === promoCode
                            }
                            variant="secondary"
                          >
                            Apply
                          </Button>
                        </div>
                        {appliedPromoCode && (
                          <div
                            className="flex items-center justify-between bg-green-50 text-green-700 px-4 py-2
                              rounded-md"
                          >
                            <span>
                              Promo code <strong>{appliedPromoCode}</strong>{" "}
                              applied ({promoDiscount}% off)
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setAppliedPromoCode(null);
                                setPromoDiscount(0);
                                setPromoCode("");
                              }}
                              className="text-green-700 hover:text-green-800"
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-food-orange" />
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {formatCurrency(prices.subtotal)}
                    </span>
                  </div>

                  {prices.itemsDiscount > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-green-600">Items Discount</span>
                      <span className="font-semibold text-green-600">
                        -{formatCurrency(prices.itemsDiscount)}
                      </span>
                    </div>
                  )}

                  {prices.promoDiscount > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-green-600">Promo Discount</span>
                      <span className="font-semibold text-green-600">
                        -{formatCurrency(prices.promoDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryMethod === "delivery"
                        ? formatCurrency(4.99)
                        : "Free"}
                    </span>
                  </div>

                  {deliveryMethod === "delivery" && (
                    <p className="text-sm text-gray-500 mt-2">
                      Delivery fee helps support our delivery partners
                    </p>
                  )}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-2xl font-bold text-food-orange">
                        {formatCurrency(prices.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleConfirmOrder}
                className="w-full py-6 text-lg bg-food-orange hover:bg-food-orange/90 transition-colors
                  cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Order...
                  </span>
                ) : (
                  "Confirm Order"
                )}
              </Button>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirm;
