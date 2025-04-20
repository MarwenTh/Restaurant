import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Truck, Home, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const OrderConfirm = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

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

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-food-orange" />
                  Choose Delivery Method
                </h2>
                <RadioGroup
                  defaultValue="delivery"
                  onValueChange={(value) =>
                    setDeliveryMethod(value as "delivery" | "pickup")
                  }
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
                            Delivery Fee: $4.99
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

              <div className="bg-white p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-food-orange" />
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">$24.99</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryMethod === "delivery" ? "$4.99" : "Free"}
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
                        ${deliveryMethod === "delivery" ? "29.98" : "24.99"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={"/order/success"}>
                <Button
                  className="w-full py-6 text-lg bg-food-orange hover:bg-food-orange/90 transition-colors
                    cursor-pointer"
                >
                  Confirm Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirm;
