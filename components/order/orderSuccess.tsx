"use client";
import { useEffect } from "react";
import { CircleCheck, MapPin, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AutoConfetti from "../ui/confetti";
import { useSession } from "next-auth/react";
import { HashLoader } from "react-spinners";

const OrderSuccess = () => {
  const { data: session, status } = useSession();
  const navigate = useRouter();

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
      <AutoConfetti />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in space-y-6">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full
                  bg-food-greenLight mb-4"
              >
                <CircleCheck className="w-12 h-12 text-food-green animate-bounce-subtle" />
              </div>

              <h1 className="text-4xl font-playfair font-bold text-gray-900">
                Order Confirmed!
              </h1>

              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Thank you for your order. We'll notify you when your delicious
                food is on its way!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div
                  className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform
                    duration-300"
                >
                  <div
                    className="w-12 h-12 bg-food-orangeLight rounded-full flex items-center justify-center
                      mx-auto mb-4"
                  >
                    <Package className="w-6 h-6 text-food-orange" />
                  </div>
                  <h3 className="font-semibold mb-2">Order Prepared</h3>
                  <p className="text-sm text-gray-600">
                    Your food is being prepared with care
                  </p>
                </div>

                <div
                  className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform
                    duration-300"
                >
                  <div
                    className="w-12 h-12 bg-food-greenLight rounded-full flex items-center justify-center
                      mx-auto mb-4"
                  >
                    <Truck className="w-6 h-6 text-food-green" />
                  </div>
                  <h3 className="font-semibold mb-2">On the Way</h3>
                  <p className="text-sm text-gray-600">
                    Your order will be delivered soon
                  </p>
                </div>

                <div
                  className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform
                    duration-300"
                >
                  <div
                    className="w-12 h-12 bg-food-yellowLight rounded-full flex items-center justify-center
                      mx-auto mb-4"
                  >
                    <MapPin className="w-6 h-6 text-food-yellow" />
                  </div>
                  <h3 className="font-semibold mb-2">Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Right to your doorstep
                  </p>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4 w-full">
                <Link href={"/marketplace"}>
                  <Button
                    variant="outline"
                    className="px-8 py-6 rounded-full text-lg font-medium cursor-pointer"
                  >
                    Back to Marketplace
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    className="bg-food-orange hover:bg-food-orange/90 text-white px-8 py-6 rounded-full text-lg
                      cursor-pointer font-medium"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
