"use client";
import AdminCategories from "@/components/dashboard/Admin/AdminCategories";
import useUser from "@/hooks/useUser";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { user } = useUser();
  return <AdminCategories />;
};

export default page;
