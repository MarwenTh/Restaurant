"use client";
import UserSettings from "@/components/UserSettings";
import useUser from "@/hooks/useUser";
import React from "react";

type Props = {};

function page({}: Props) {
  const { user, loading } = useUser();
  return <UserSettings user={user} loading={loading} />;
}

export default page;
