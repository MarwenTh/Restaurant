"use client";
import React, { FC, useEffect, useState } from "react";
import { IPromo } from "@/lib/database/models/promo.model";
import { motion } from "framer-motion";
import { Copy, Check, Percent, Calendar, Tag } from "lucide-react";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";
import { User } from "@/interface";

type Props = {
  user: User | null;
};

const PromoCodes: FC<Props> = ({ user }) => {
  const [promoCodes, setPromoCodes] = useState<IPromo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await fetch("/api/promo");
        if (!response.ok) {
          throw new Error("Failed to fetch promo codes");
        }
        const data = (await response.json()) as IPromo[];
        setPromoCodes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPromoCodes();
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <HashLoader color="#ff6b00" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Promo Codes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoCodes.length < 1 ? (
          <div className="text-center text-gray-500">No promo codes found</div>
        ) : (
          promoCodes.map((promo) => (
            <motion.div
              key={promo._id.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border ${
                promo.available ? "border-green-200" : "border-red-200" }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">{promo.code}</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(promo.code)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Percent className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">
                      {promo.discount}% discount
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">
                      Created: {new Date(promo.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        promo.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {promo.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default PromoCodes;
