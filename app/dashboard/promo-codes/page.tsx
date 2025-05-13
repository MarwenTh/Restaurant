"use client";
import CodePromo from "@/components/dashboard/Admin/CodePromo";
import PromoCodes from "@/components/dashboard/Client/PromoCodes";
import useUser from "@/hooks/useUser";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { user } = useUser();
  return (
    <>{user?.role === "Admin" ? <CodePromo /> : <PromoCodes user={user} />}</>
  );
};

export default page;
