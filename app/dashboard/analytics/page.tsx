"use client";
import AdminAnalytics from "@/components/dashboard/Admin/AdminAnalytics";
import SellerAnalytics from "@/components/dashboard/Seller/SellerAnalytics";
import useUser from "@/hooks/useUser";
import React from "react";
import { HashLoader } from "react-spinners";

type Props = {};

const page = (props: Props) => {
  const { loading, user } = useUser();
  if (loading)
    return (
      <div className="h-[calc(100vh-80px)] flex justify-center items-center">
        <HashLoader color="#ff6b00" />
      </div>
    );
  return (
    <>{user?.role === "Admin" ? <AdminAnalytics /> : <SellerAnalytics />} </>
  );
};

export default page;
