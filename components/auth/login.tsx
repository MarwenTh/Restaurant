"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return <HashLoader color="#ff6b00" />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result?.error) {
        toast.success("Congrats! You have successfully signed in!");
        router.push("/dashboard/users");
      } else {
        toast.error(result.error);
      }
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Branding */}
          <div
            className="md:w-1/2 bg-gradient-to-br from-amber-500 to-orange-600 p-8 md:p-12 flex
              flex-col justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start mb-6">
                <FaUtensils className="text-white text-4xl mr-2" />
                <h1 className="text-3xl font-bold text-white">FoodGuide</h1>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Welcome back!
              </h2>
              <p className="text-amber-100 mb-6">
                Sign in to your account and continue exploring delicious food
                options.
              </p>
              <div className="hidden md:block">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaUtensils className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      FoodGuide Marketplace
                    </p>
                    <p className="text-amber-100 text-sm">
                      Your one-stop food destination
                    </p>
                  </div>
                </div>
                <p className="text-amber-100 text-sm">
                  Join thousands of food lovers who trust FoodGuide for their
                  daily meals.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Sign in to your account
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Enter your credentials to access your account
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-amber-600 hover:text-amber-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                    shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500
                    to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-amber-500
                    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  type={loading ? "button" : "submit"}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <FaSpinner className="animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </motion.button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border
                      border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
                      hover:bg-gray-50"
                    type="button"
                    onClick={() => signIn("github")}
                  >
                    <IconBrandGithub className="h-5 w-5 mr-2" />
                    <span>GitHub</span>
                  </motion.button>
                </div>{" "}
                <div className="mt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border
                      border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white
                      hover:bg-gray-50"
                    type="button"
                    onClick={() => signIn("google")}
                  >
                    <IconBrandGoogle className="h-5 w-5 mr-2" />
                    <span>Google</span>
                  </motion.button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-amber-600 hover:text-amber-500"
                  >
                    Register for free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
