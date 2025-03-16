"use client";
import SidebarDemo from "@/components/dashboard/dashboard";
import Navbar from "@/components/dashboard/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className=" flex flex-row h-screen">
        <SidebarDemo />
        <div className="flex flex-col bg-gray-100 dark:bg-neutral-800 flex-1 px-6 ">
          <Navbar />
          <div className=" overflow-y-scroll">{children}</div>
        </div>
      </div>
    </div>
  );
}
