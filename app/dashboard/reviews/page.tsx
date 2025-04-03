"use client";
import AdminReviews from "@/components/dashboard/Admin/AdminReviews";
import SellerReviews from "@/components/dashboard/Seller/SellerReviews";
import useUser from "@/hooks/useUser";
import React from "react";
import { HashLoader } from "react-spinners";

type Props = {};

function page({}: Props) {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="h-[calc(100vh-80px)] flex justify-center items-center">
        <HashLoader color="#ff6b00" />
      </div>
    );
  return <>{user?.role === "Admin" ? <AdminReviews /> : <SellerReviews />} </>;
}

export default page;
