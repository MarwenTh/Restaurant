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
import { FaSpinner } from "react-icons/fa6";
export function Signup() {
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
    { name: "Vendor", icon: <TbReportMoney /> },
  ];

  return (
    <div className="w-full border-2 py-10 px-14 border-[#8e8d8b] rounded-4xl mx-36">
      <div className="flex justify-between items-center">
        <Image src={FoodPNG} alt="food" />
        <div
          className="max-w-xl w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/60
            dark:bg-black/60"
        >
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to FoodGuide
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Signup to FoodGuide now!!
          </p>

          <form className="my-5" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              {/* <div>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Foulen" type="text" />
              </div> */}
              <div className="w-full">
                <Label htmlFor="lastname">Fullname</Label>
                <Input
                  id="fullname"
                  placeholder="Foulen Ben Foulen"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="foulenbenfoulen@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button
              className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900
                dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white
                rounded-md h-10 font-medium
                shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
                dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]
                ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
              type={loading ? "button" : "submit"}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <FaSpinner className="animate-spin" />
                  <div>Loading...</div>
                </div>
              ) : (
                <div>Signup &rarr;</div>
              )}
              {/* <BottomGradient /> */}
            </button>
            <div
              className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700
                to-transparent my-8 h-[1px] w-full"
            />
            <div className="flex flex-col space-y-4">
              <button
                className="relative group/btn cursor-pointer flex space-x-2 items-center justify-start px-4
                  w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50
                  dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
                onClick={() => signIn("github")}
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  GitHub
                </span>
                {/* <BottomGradient /> */}
              </button>
              {/* <button
                className=" relative group/btn cursor-pointer flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Google
                </span>
                <BottomGradient />
              </button> */}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <p className="text-white">Already have an account?</p>
              <Link href={"/login"} className="text-blue-500">
                Login Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
