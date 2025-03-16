"use client";
import React from "react";
import BreadcrumbWithCustomSeparator from "../ui/BreadcrumbWithCustomSeparator";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import UserDropdown from "./userDropdown";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname(); // Get current URL path
  const pathSegments = pathname.split("/").filter((segment) => segment); // Remove empty segments
  const { data: session, status } = useSession();
  return (
    <div className=" flex flex-row justify-between items-center py-2 px-4 bg-transparent dark:bg-neutral-900 border-b dark:border-neutral-700">
      <BreadcrumbWithCustomSeparator pathSegments={pathSegments} />
      <UserDropdown session={session} />
    </div>
  );
};

export default Navbar;
