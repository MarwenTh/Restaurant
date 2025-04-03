"use client";
import { AreaChartTemplate } from "@/components/areaChart";
import { UserTable } from "@/components/dashboard/user-table";
import useUser from "@/hooks/useUser";
import React from "react";
import { HashLoader } from "react-spinners";

type Props = {};

const page = (props: Props) => {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="h-[calc(100vh-80px)] flex justify-center items-center">
        <HashLoader color="#ff6b00" />
      </div>
    );
  return <UserTable />;
};

export default page;
