"use client";
import SellerSettings from "@/components/dashboard/Seller/SellerSettings";
import useUser from "@/hooks/useUser";
import React from "react";

type Props = {};

function page({}: Props) {
  const { user, loading } = useUser();
  return <SellerSettings />;
}

export default page;
