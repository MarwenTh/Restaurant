"use client";
import React, { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";

type Props = {
  session: any;
};

const UserDropdown: FC<Props> = ({ session }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" relative">
      <Avatar className=" cursor-pointer">
        <AvatarImage
          src={session?.user?.image}
          alt="Avatar"
          onClick={() => setOpen(!open)}
        />
        <AvatarFallback>
          {session?.user?.name?.split(" ").map((name: string) => name[0])}
        </AvatarFallback>
      </Avatar>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className=" absolute right-0 mt-2 w-fit bg-white dark:bg-neutral-700 rounded-md shadow-lg  z-10 h-fit "
          >
            <div className="px-3 py-2 ">
              <div className=" ">{session?.user?.email}</div>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-300 to-transparent my-3 h-[1px] w-full" />
              <div
                className=" cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-2"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
              >
                SignOut
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
