"use client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

const OrderFailed = () => {
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
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>

              <h1 className="text-4xl font-playfair font-bold text-gray-900">
                Order Failed
              </h1>

              <p className="text-lg text-gray-600 max-w-md mx-auto">
                We apologize, but there was an issue processing your order.
              </p>

              <Alert variant="destructive" className="mx-auto max-w-md">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                  Please try again or contact our support if the problem
                  persists.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 mt-8">
                <Link href={"/order/confirm"}>
                  <Button
                    className="bg-food-orange hover:bg-food-orange/90 text-white px-8 py-6 rounded-full text-lg
                      cursor-pointer font-medium"
                  >
                    Try Again
                  </Button>
                </Link>
                <Link href={"/marketplace"}>
                  <Button
                    variant="outline"
                    className="px-8 py-6 rounded-full text-lg font-medium cursor-pointer"
                  >
                    Back to Marketplace
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

export default OrderFailed;
