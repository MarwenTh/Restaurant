"use client";
import SidebarDemo from "@/components/dashboard/SideBarDemo";
import Overview from "@/components/dashboard/Overview";
import useUser from "@/hooks/useUser";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { user, loading } = useUser();
  return <Overview user={user} loading={loading} />;
};

export default page;
