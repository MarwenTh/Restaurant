"use client";

import { User } from "@/interface";
import React, { FC } from "react";
import AdminOverview from "./Admin/AdminOverview";
import SellerOverview from "./Seller/SellerOverview";
import ClientOverview from "./Client/ClientOverview";
import { FaSpinner } from "react-icons/fa6";
import { HashLoader } from "react-spinners";

type Props = {
  user: User | null;
  loading: boolean;
};

const Overview: FC<Props> = ({ user, loading }) => {
  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <HashLoader color="#ff6b00" />
      </div>
    );
  }
  return (
    <>
      {user?.role === "Admin" ? (
        <AdminOverview />
      ) : user?.role === "Seller" ? (
        <SellerOverview />
      ) : user?.role === "Client" ? (
        <ClientOverview />
      ) : (
        <SellerOverview />
      )}
    </>
  );
};

export default Overview;
