"use client";
import Navbar from "@/components/dashboard/navbar";
import SidebarDemo from "@/components/dashboard/SideBarDemo";
import useUser from "@/hooks/useUser";

import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { user, loading } = useUser();
  return (
    <div>
      <div className="flex flex-row h-screen">
        <SidebarDemo user={user} loading={loading} />
        <div className="flex flex-col bg-gray-100 dark:bg-neutral-800 flex-1 px-6">
          <Navbar />
          <div className="overflow-y-scroll">{children}</div>
        </div>
      </div>
    </div>
  );
}
