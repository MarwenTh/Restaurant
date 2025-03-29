"use client";

import { User } from "@/interface";
import React, { FC } from "react";
import AdminOverview from "./Admin/AdminOverview";
import SellerOverview from "./Seller/SellerOverview";
import ClientOverview from "./Client/ClientOverview";

type Props = {
  user: User | null;
  loading: boolean;
};

const Overview: FC<Props> = ({ user, loading }) => {
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
