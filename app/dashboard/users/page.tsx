"use client";
import { AreaChartTemplate } from "@/components/areaChart";
import { UserTable } from "@/components/dashboard/user-table";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className=" flex flex-col space-y-7">
      <UserTable />
      <AreaChartTemplate />
    </div>
  );
};

export default page;
