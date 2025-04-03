"use client";
import React, { FC, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebarAceternity";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  MdDashboard,
  MdOutlineDashboard,
  MdOutlineReviews,
  MdRestaurantMenu,
} from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { FaSackDollar, FaSpinner } from "react-icons/fa6";
import { IoAnalyticsSharp } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { SiIfood } from "react-icons/si";
import { User } from "@/interface";
import { Settings, Truck, Users } from "lucide-react";

type Props = {
  user: User | null;
  loading: boolean;
};

const SidebarDemo: FC<Props> = ({ user, loading }) => {
  const links = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <MdOutlineDashboard className="h-5 w-5 shrink-0" />,
    },
    {
      label:
        user?.role === "Admin"
          ? "Users"
          : user?.role === "Seller"
            ? "Menu Items"
            : user?.role === "Client"
              ? "Test"
              : "Test 2",
      href:
        user?.role === "Admin"
          ? "/dashboard/users"
          : user?.role === "Seller"
            ? "/dashboard/menu-items"
            : user?.role === "Client"
              ? "/Test"
              : "/Test 2",
      icon:
        user?.role === "Admin" ? (
          <Users className="h-5 w-5 shrink-0" />
        ) : (
          <MdRestaurantMenu className="h-5 w-5 shrink-0" />
        ),
    },
    user?.role !== "Admin" && {
      label:
        user?.role === "Seller"
          ? "Orders"
          : user?.role === "Client"
            ? "Test"
            : "Test 2",
      href:
        user?.role === "Seller"
          ? "/dashboard/orders"
          : user?.role === "Client"
            ? "/Test"
            : "/Test 2",
      icon: <BsCart3 className="h-5 w-5 shrink-0" />,
    },
    {
      label:
        user?.role === "Admin"
          ? "Deliveries"
          : user?.role === "Seller"
            ? "Earnings"
            : user?.role === "Client"
              ? "Test"
              : "Test 2",
      href:
        user?.role === "Admin"
          ? "/dashboard/deliveries"
          : user?.role === "Seller"
            ? "/dashboard/earnings"
            : user?.role === "Client"
              ? "/Test"
              : "/Test 2",
      icon:
        user?.role === "Admin" ? (
          <Truck className="h-5 w-5 shrink-0" />
        ) : (
          <FaSackDollar className="h-5 w-5 shrink-0" />
        ),
    },
    {
      label:
        user?.role === "Admin"
          ? "Analytics"
          : user?.role === "Seller"
            ? "Analytics"
            : user?.role === "Client"
              ? "Test"
              : "Test 2",
      href:
        user?.role === "Admin"
          ? "/dashboard/analytics"
          : user?.role === "Seller"
            ? "/dashboard/analytics"
            : user?.role === "Client"
              ? "/Test"
              : "/Test 2",
      icon: <IoAnalyticsSharp className="h-5 w-5 shrink-0" />,
    },
    user?.role !== "Admin" && {
      label:
        user?.role === "Seller"
          ? "Schedule"
          : user?.role === "Client"
            ? "Test"
            : "Test 2",
      href:
        user?.role === "Seller"
          ? "/dashboard/schedule"
          : user?.role === "Client"
            ? "/Test"
            : "/Test 2",
      icon: <CiCalendar className="h-5 w-5 shrink-0" />,
    },
    {
      label:
        user?.role === "Admin"
          ? "Reviews"
          : user?.role === "Seller"
            ? "Reviews"
            : user?.role === "Client"
              ? "Test"
              : "Test 2",
      href:
        user?.role === "Admin"
          ? "/dashboard/reviews"
          : user?.role === "Seller"
            ? "/dashboard/reviews"
            : user?.role === "Client"
              ? "/Test"
              : "/Test 2",
      icon: <MdOutlineReviews className="h-5 w-5 shrink-0" />,
    },
    {
      label:
        user?.role === "Admin"
          ? "Settings"
          : user?.role === "Seller"
            ? "Settings"
            : user?.role === "Client"
              ? "Test"
              : "Test 2",
      href:
        user?.role === "Admin"
          ? "/dashboard/settings"
          : user?.role === "Seller"
            ? "/dashboard/settings"
            : user?.role === "Client"
              ? "/Test"
              : "/Test 2",
      icon: <Settings className="h-5 w-5 shrink-0" />,
    },
  ].filter((link): link is { label: string; href: string; icon: any } =>
    Boolean(link),
  );

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        `rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 border
        border-neutral-200 dark:border-neutral-700 overflow-hidden`,
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      {loading ? (
        <FaSpinner className="animate-spin" size={25} />
      ) : (
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
      )}
    </div>
  );
};
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <SiIfood className="h-7 w-7 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        FoodGuide
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <SiIfood className="h-7 w-7 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700
          bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full"
      >
        <div className="flex gap-2">
          {[...new Array(4)].map((i, idx) => (
            <div
              key={"first-array" + idx}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i, idx) => (
            <div
              key={"second-array" + idx}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarDemo;
