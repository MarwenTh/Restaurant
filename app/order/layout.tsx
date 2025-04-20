"use client";

import Link from "next/link";
import React from "react";
import { SiIfood } from "react-icons/si";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black"
          >
            <span className="text-xl md:text-2xl font-bold text-[#f97415] flex items-center space-x-2">
              <SiIfood size={40} />
              Food<span className="text-[#e64d19]">Guide</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
