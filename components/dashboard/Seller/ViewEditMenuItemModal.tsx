"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MenuItem } from "@/interface";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Image as ImageIcon, Upload, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

interface ViewEditMenuItemModalProps {
  menuItem: MenuItem;
  onSuccess?: () => void;
  mode: "view" | "edit";
}

const ViewEditMenuItemModal: React.FC<ViewEditMenuItemModalProps> = ({
  menuItem,
  onSuccess,
  mode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<MenuItem>>(menuItem);
  const [imagePreview, setImagePreview] = useState<string>(menuItem.image);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `/api/menu-item?id=${menuItem._id}`,
        formData,
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Menu item updated successfully",
        });
        setIsOpen(false);
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "Failed to update menu item",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData);
      setFormData((prev) => ({ ...prev, image: response.data.url }));
      setImagePreview(response.data.url);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          {mode === "view" ? "View Details" : "Edit Item"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" ? "Menu Item Details" : "Edit Menu Item"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt={formData.name || "Menu item"}
                      fill
                      className="object-cover"
                    />
                    {mode === "edit" && (
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              {mode === "edit" && (
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Upload size={16} />
                    {isUploading ? "Uploading..." : "Change Image"}
                  </Label>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={mode === "view"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={mode === "view"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value),
                }))
              }
              disabled={mode === "view"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={
                Array.isArray(formData.category)
                  ? formData.category.join(", ")
                  : formData.category
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value.split(",").map((cat) => cat.trim()),
                }))
              }
              disabled={mode === "view"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as
                    | "available"
                    | "out_of_stock"
                    | "hidden",
                }))
              }
              disabled={mode === "view"}
              className="w-full p-2 border rounded-md"
            >
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          {mode === "edit" && (
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Menu Item"
              )}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ViewEditMenuItemModal;
