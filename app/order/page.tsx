"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import OrderConfirm from "@/components/order/orderConfirm";

export default function OrderRedirect() {
  return <OrderConfirm />;
}
