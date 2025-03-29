"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import useUsers from "@/hooks/useUser";
import { FaSpinner } from "react-icons/fa6";
import useUser from "@/hooks/useUser";
type Props = {
  session: any;
};

const UserDropdown: FC<Props> = ({ session }) => {
  const { user, loading, error } = useUser();

  if (loading) {
    return <FaSpinner size={20} className="animate-spin" />;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="cursor-pointer hover:ring-2 hover:ring-[#0f1729]/50 transition-all ease-in-out
            rounded-md flex items-center space-x-1 px-2 py-1"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={
                user?.image ??
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt={user?.name}
            />
          </Avatar>

          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none text-orange-400 font-semibold">
              {user?.name}
            </p>

            {user?.role && (
              <p className="text-xs leading-none text-[#64748b] font-medium">
                {user?.role}
              </p>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/dashboard"} className="cursor-pointer">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {session?.user && (
          <DropdownMenuItem className="cursor-pointer">
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
