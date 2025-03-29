"use client";
import React from "react";
import BreadcrumbWithCustomSeparator from "../ui/BreadcrumbWithCustomSeparator";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserDropdown from "./userDropdown";
import ThemeModeToggle from "../theme-mode-toggle";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname(); // Get current URL path
  const pathSegments = pathname.split("/").filter((segment) => segment); // Remove empty segments
  const { data: session, status } = useSession();

  // console.log("session", session);
  return (
    <div className="flex flex-row justify-between items-center py-2 px-4 bg-transparent">
      <BreadcrumbWithCustomSeparator pathSegments={pathSegments} />
      <div className="flex flex-row items-center space-x-4">
        <ThemeModeToggle />
        <UserDropdown session={session} />
      </div>
    </div>
  );
};

export default Navbar;
