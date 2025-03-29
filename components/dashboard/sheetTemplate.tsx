"use client";
import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/interface";

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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
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
          <Avatar className="text-center">
            <AvatarImage
              src={selectedUser?.image}
              alt={selectedUser?.name}
              sizes="15px"
            />
            <AvatarFallback>
              {selectedUser?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* <LabelInputContainer className="mb-4">
            <Label htmlFor="email">FullName</Label>
            <Input
              id="fullname"
              placeholder="foulen ben foulen"
              type="etextmail"
              value={selectedUser?.name}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="foulenbenfoulen@email.com"
              type="email"
              value={selectedUser?.email}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Role</Label>
            <Input
              id="role"
              placeholder="Role"
              type="text"
              value={selectedUser?.role}
            />
          </LabelInputContainer> */}
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
