"use client";
import UserProfile from "@/components/dashboard/Client/UserProfile";
import useUser from "@/hooks/useUser";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { user, loading, error, refetch } = useUser();
  return (
    <>
      {user?.role === "Client" ? (
        <UserProfile
          user={user}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      ) : (
        "Admin"
      )}
    </>
  );
};

export default page;
