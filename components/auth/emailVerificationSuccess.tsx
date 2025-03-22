"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AutoConfetti from "../ui/confetti";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { MdError } from "react-icons/md";

const EmailVerificationSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState(false);

  //   useEffect(() => {
  //     // Trigger confetti after component mounts
  //     setShowConfetti(true);
  //
  //     // Optional: Hide confetti after some time
  //     const timer = setTimeout(() => setShowConfetti(false), 4000);
  //     return () => clearTimeout(timer);
  //   }, []);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.");
      setError(true);
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(`/api/auth/verify?token=${token}`);

        const data = res.data;
        if (res.status >= 200 && res.status < 300) {
          setMessage(data.message);
          //   setTimeout(() => router.push("/login"), 3000); // Redirect to login
          setShowConfetti(true);
        } else {
          setMessage(data.error);
          setError(true);
        }
      } catch (err) {
        const errorMsg =
          (axios.isAxiosError(err) && err.response?.data?.error) ||
          "Something went wrong. Please try again.";
        setMessage(errorMsg);
        setError(true);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <>
      {error ? (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background
              to-secondary/10 z-0"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          </div>
          <div className="container relative z-10 px-4 py-10 mx-auto">
            <Card className="mx-auto max-w-md w-full shadow-lg border-primary/10 dark:border-primary/20">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div
                  className="relative flex items-center justify-center w-24 h-24 rounded-full bg-background
                    shadow-lg border-4 border-background animate-bounce-slow"
                >
                  <MdError className="h-12 w-12 text-red-500 animate-pulse-slow" />
                </div>
              </div>

              <CardHeader className="text-center pt-16">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                    Verification not completed
                  </span>
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  {message}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center space-y-4">
                {/* <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">
                    You now have full access to all features and services. We're
                    excited to have you on board!
                  </p>
                </div> */}

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Account not activated</span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Link href={"signup"} className="w-full">
                  <Button
                    className="w-full group h-11 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600
                      cursor-pointer hover:to-red-700 transition-all duration-300"
                  >
                    Return to signup
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                {/* <Button variant="ghost" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Button> */}
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Animated background */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background
              to-secondary/10 z-0"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          </div>
          {showConfetti && <AutoConfetti />}
          {/* Confetti effect */}
          {/* {showConfetti && <Confetti />} */}
          <div className="container relative z-10 px-4 py-10 mx-auto">
            <Card className="mx-auto max-w-md w-full shadow-lg border-primary/10 dark:border-primary/20">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div
                  className="relative flex items-center justify-center w-24 h-24 rounded-full bg-background
                    shadow-lg border-4 border-background animate-bounce-slow"
                >
                  <CheckCircle className="h-12 w-12 text-green-500 animate-pulse-slow" />
                </div>
              </div>

              <CardHeader className="text-center pt-16">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                    Verification Complete!
                  </span>
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Your email has been successfully verified
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-muted-foreground">
                    You now have full access to all features and services. We're
                    excited to have you on board!
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Account activated</span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button
                  className="w-full group h-11 bg-gradient-to-r from-green-500 to-emerald-600
                    hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="ghost" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerificationSuccess;
