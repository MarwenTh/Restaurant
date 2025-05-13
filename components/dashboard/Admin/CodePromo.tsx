"use client";
import React, { FC, useEffect, useState } from "react";
import { IPromo } from "@/lib/database/models/promo.model";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const CodePromo: FC = () => {
  const [promoCodes, setPromoCodes] = useState<IPromo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    available: true,
  });

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await fetch("/api/promo");
      if (!response.ok) {
        throw new Error("Failed to fetch promo codes");
      }
      const data = await response.json();
      setPromoCodes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: formData.code.toUpperCase(),
          discount: Number(formData.discount),
          available: formData.available,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create promo code");
      }

      toast.success("Promo code created successfully!");
      setIsAdding(false);
      setFormData({ code: "", discount: "", available: true });
      fetchPromoCodes();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create promo code",
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/promo?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete promo code");
      }

      toast.success("Promo code deleted successfully!");
      fetchPromoCodes();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete promo code",
      );
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`/api/promo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: formData.code.toUpperCase(),
          discount: Number(formData.discount),
          available: formData.available,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update promo code");
      }

      toast.success("Promo code updated successfully!");
      setEditingId(null);
      setFormData({ code: "", discount: "", available: true });
      fetchPromoCodes();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update promo code",
      );
    }
  };

  const startEditing = (promo: IPromo) => {
    setEditingId(promo._id.toString());
    setFormData({
      code: promo.code,
      discount: promo.discount.toString(),
      available: promo.available,
    });
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Promo Codes Management</h1>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-food-orange hover:bg-food-orange/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Promo Code
        </Button>
      </div>

      {(isAdding || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg mb-8"
        >
          <form
            onSubmit={
              editingId
                ? (e) => {
                    e.preventDefault();
                    handleUpdate(editingId);
                  }
                : handleSubmit
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Promo Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="Enter promo code"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                  placeholder="Enter discount percentage"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, available: checked })
                  }
                />
                <Label htmlFor="available">Available</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ code: "", discount: "", available: true });
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-food-orange hover:bg-food-orange/90"
              >
                <Check className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promoCodes.map((promo) => (
          <motion.div
            key={promo._id.toString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border ${
            promo.available ? "border-green-200" : "border-red-200" }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{promo.code}</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditing(promo)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(promo._id.toString())}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Discount: {promo.discount}%</p>
                <p className="text-gray-600">
                  Status:{" "}
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    promo.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {promo.available ? "Available" : "Unavailable"}
                  </span>
                </p>
                <p className="text-gray-600">
                  Created: {new Date(promo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CodePromo;
