"use client";
import ClientReservations from "@/components/dashboard/reservations/ClientReservations";
import SellerReservations from "@/components/dashboard/reservations/SellerReservations";
import useUser from "@/hooks/useUser";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { user } = useUser();
  return (
    <div>
      {user?.role === "Client" ? (
        <ClientReservations />
      ) : (
        <SellerReservations />
      )}
    </div>
  );
};

export default page;
