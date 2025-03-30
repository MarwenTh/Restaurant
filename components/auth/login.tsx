"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { BottomGradient, Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Image from "next/image";
import FoodPNG from "@/public/assets/food.png";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa6";

export function Login() {
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
    <div className="w-full py-10 px-14 border-[#8e8d8b] border-2 rounded-4xl mx-36">
      <div className="flex justify-between items-center">
        <Image src={FoodPNG} alt="food" />{" "}
        <div
          className="max-w-xl w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white/60
            dark:bg-black/60"
        >
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to FoodGuide
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login to FoodGuide now!!
          </p>

          <form className="my-5" onSubmit={handleSubmit}>
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
                <div>Login &rarr;</div>
              )}
              <BottomGradient />
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
                <BottomGradient />
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
              <p className="text-white">Don't have an account yet?</p>
              <Link href={"/signup"} className="text-blue-500">
                Register for free
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
