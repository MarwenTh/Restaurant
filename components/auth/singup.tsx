"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { BottomGradient, Input, LabelInputContainer } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";
import FoodPNG from "@/public/assets/food.png";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

export function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <HashLoader color="#ff6b00" />;
  }

  if (session) {
    router.push("/");
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const items = ["Client", "Restaurant", "Delivery", "Admin", "Vendor"];

  return (
    <div className=" w-full border-2 py-10 px-14   border-[#8e8d8b] rounded-4xl mx-36">
      <div className=" flex justify-between items-center ">
        <Image src={FoodPNG} alt="food" />
        <div className="max-w-xl w-full  rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/60 dark:bg-black/60 ">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to FoodGuide
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Signup to FoodGuide now!!
          </p>

          <form className="my-5" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Foulen" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Ben Foulen" type="text" />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="foulenbenfoulen@email.com"
                type="email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4 relative">
              <Label htmlFor="role">Role</Label>
              <button
                className=" cursor-pointer flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400"
                onClick={() => setIsOpen(!isOpen)}
              >
                Please select your role
              </button>
              <AnimatePresence>
                {!isOpen && <motion.div></motion.div>}
              </AnimatePresence>
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br cursor-pointer relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <div className="flex flex-col space-y-4">
              <button
                className=" relative group/btn cursor-pointer flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
                onClick={() => signIn("github")}
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  GitHub
                </span>
                <BottomGradient />
              </button>
              <button
                className=" relative group/btn cursor-pointer flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Google
                </span>
                <BottomGradient />
              </button>
            </div>
            <div className=" flex justify-end space-x-2 mt-4">
              <p className=" text-white">Already have an account?</p>
              <Link href={"/login"} className=" text-blue-500">
                Login Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
