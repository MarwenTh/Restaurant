"use client";
import React, { FC } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import BarChartTemplate from "../barChart";
import { User } from "@/interface";

type Props = {
  selectedUser: User | null;
  setSelectedUser: (value: User) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
};

const DrawerTemplate: FC<Props> = ({
  selectedUser,
  setSelectedUser,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent>
        <div className="mx-auto w-full px-8">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {selectedUser?.name + " Top Activity"}
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {selectedUser?.email}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <BarChartTemplate />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Ok</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerTemplate;
