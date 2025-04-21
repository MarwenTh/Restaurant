"use client";
import Login from "@/components/auth/login";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const page = (props: Props) => {
  return (
    <div
      className="h-screen flex items-center justify-center relative bg-gradient-to-br
        from-amber-50 to-orange-100 overflow-hidden"
    >
      {/* Animated food icons in the background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-bounce absolute top-20 left-20 text-7xl text-orange-200/30">
          🍕
        </div>
        <div className="animate-bounce absolute top-1/3 right-1/4 text-6xl text-amber-200/30">
          🍔
        </div>
        <div className="animate-bounce absolute bottom-1/4 left-1/3 text-5xl text-orange-200/30">
          🍜
        </div>
        <div className="animate-bounce absolute top-2/3 right-1/3 text-6xl text-amber-200/30">
          🍣
        </div>
        <div className="animate-bounce absolute bottom-20 right-20 text-5xl text-orange-200/30">
          🍱
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-300/20 rounded-full filter blur-3xl"></div>
      </div>

      <Login />
    </div>
  );
};

export default page;
