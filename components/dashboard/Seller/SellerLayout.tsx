"use client";
import React from "react";

interface SellerLayoutProps {
  children: React.ReactNode;
  title: string;
}

const SellerLayout: React.FC<SellerLayoutProps> = ({ children, title }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default SellerLayout;
