"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";
import FoodPNG from "@/public/assets/food.png";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";

import { FiUser } from "react-icons/fi";
import { FaSpinner, FaUtensils } from "react-icons/fa6";
const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Please select your role");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]); // ✅ No conditional hooks

  if (status === "loading") {
    return <HashLoader color="#ff6b00" />;
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post("/api/user", {
        email,
        name,
        password,
        role: selectedItem,
      });

      if (!result?.data?.error) {
        toast.success("Congrats! You have successfully signed up!");
        router.push("/login");
      } else {
        toast.error(result?.data?.error);
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      // Display error message from server response if available
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      name: "Client",
      icon: <FiUser />,
    },
    {
      name: "Delivery",
      icon: <MdOutlineDeliveryDining />,
    },
    { name: "Seller", icon: <TbReportMoney /> },
  ];

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
                Welcome to FoodGuide
              </h2>
              <p className="text-amber-100 mb-6">
                Discover the best food options around you. Sign up to explore
                our marketplace
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
                      Explore a variety of food options from local sellers.
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
                Sign up to your account
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Enter your details to create an account and start exploring our
                marketplace.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="fullname" className="text-gray-700">
                    Fullname
                  </Label>
                  <Input
                    id="fullname"
                    placeholder="Foulen Ben Foulen"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    placeholder="foulenbenfoulen@email.com"
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

                <div className="mb-4 relative">
                  <Label htmlFor="role">Role</Label>
                  <button
                    className="cursor-pointer flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800
                      text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm
                      file:border-0 file:bg-transparent file:text-sm file:font-medium
                      placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                      focus-visible:outline-none focus-visible:ring-[2px]
                      focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                      disabled:cursor-not-allowed disabled:opacity-50
                      dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none
                      transition duration-400"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                  >
                    {selectedItem}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="absolute top-16 w-full z-10 bg-white dark:bg-zinc-800 border border-neutral-200
                          dark:border-neutral-700 rounded-md shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {items.map((item, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 flex
                              space-x-3 flex-row items-center rounded-md border-t border-neutral-200
                              dark:border-neutral-700"
                            onClick={() => {
                              setIsOpen(false);
                              setSelectedItem(item.name);
                            }}
                          >
                            {item.icon}
                            <div>{item.name}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                      <span>Signing up...</span>
                    </div>
                  ) : (
                    "Sign up"
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
                </div>
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
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-amber-600 hover:text-amber-500"
                  >
                    Login Now
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

export default Signup;
