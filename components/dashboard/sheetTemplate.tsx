"use client";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

type Props = {
  selectedUser: User | null;
  setSelectedUser: (value: User) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
};

const SheetTemplate: FC<Props> = ({
  selectedUser,
  setSelectedUser,
  isSheetOpen,
  setIsSheetOpen,
}) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* {JSON.stringify(selectedUser)} */}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetTemplate;
