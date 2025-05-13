"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
import {
  Plus,
  Utensils,
  Clock,
  Flame,
  Leaf,
  Wheat,
  Carrot,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { MenuItem } from "@/interface";
import axios from "axios";
import useUser from "@/hooks/useUser";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AddMenuItemModalProps {
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  category: string[];
  ingredients: string[];
  status: "available" | "out_of_stock" | "hidden";
  dietaryInfo: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
  };
  isAvailable: boolean;
  isSpicy: boolean;
  popularity: number;
  preparationTime: number;
  image: string;
}

interface Category {
  _id: string;
  name: string;
}

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();
  const { user } = useUser();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: 0,
    category: [],
    ingredients: [],
    status: "available",
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },
    isAvailable: true,
    isSpicy: false,
    popularity: 0,
    preparationTime: 0,
    image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "category" | "ingredients",
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name.startsWith("dietaryInfo.")) {
      const dietaryField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        dietaryInfo: {
          ...prev.dietaryInfo,
          [dietaryField]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    if (category && !formData.category.includes(category.name)) {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, category.name],
      }));
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      category: prev.category.filter((cat) => cat !== categoryToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/menu-item", {
        ...formData,
        seller: user?._id,
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Menu item created successfully",
        });
        setIsOpen(false);
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.error || "Failed to create menu item",
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF9F43]"
                placeholder="Enter item name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <Carrot className="h-4 w-4" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF9F43] min-h-[100px]"
                placeholder="Describe your menu item..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2">
                <span className="text-[#FF9F43]">$</span>
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF9F43]"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Wheat className="h-4 w-4" />
                Categories
              </Label>
              <Select onValueChange={handleCategorySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.category.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="flex items-center gap-1 bg-[#FF9F43]/10 text-[#FF9F43] hover:bg-[#FF9F43]/20"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => removeCategory(cat)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="ingredients" className="flex items-center gap-2">
                <Carrot className="h-4 w-4" />
                Ingredients (comma-separated)
              </Label>
              <Input
                id="ingredients"
                name="ingredients"
                value={formData.ingredients.join(", ")}
                onChange={(e) => handleArrayInputChange(e, "ingredients")}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF9F43]"
                placeholder="e.g., Rice, Chicken, Vegetables"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="preparationTime"
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Preparation Time (minutes)
              </Label>
              <Input
                id="preparationTime"
                name="preparationTime"
                type="number"
                value={formData.preparationTime}
                onChange={handleInputChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-[#FF9F43]"
                placeholder="Enter preparation time"
                min="0"
              />
            </div>
            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                Dietary Information
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:border-[#FF9F43]
                    transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    id="dietaryInfo.isVegetarian"
                    name="dietaryInfo.isVegetarian"
                    checked={formData.dietaryInfo.isVegetarian}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#FF9F43] focus:ring-[#FF9F43]"
                  />
                  <Label
                    htmlFor="dietaryInfo.isVegetarian"
                    className="cursor-pointer"
                  >
                    Vegetarian
                  </Label>
                </div>
                <div
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:border-[#FF9F43]
                    transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    id="dietaryInfo.isVegan"
                    name="dietaryInfo.isVegan"
                    checked={formData.dietaryInfo.isVegan}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#FF9F43] focus:ring-[#FF9F43]"
                  />
                  <Label
                    htmlFor="dietaryInfo.isVegan"
                    className="cursor-pointer"
                  >
                    Vegan
                  </Label>
                </div>
                <div
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:border-[#FF9F43]
                    transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    id="dietaryInfo.isGlutenFree"
                    name="dietaryInfo.isGlutenFree"
                    checked={formData.dietaryInfo.isGlutenFree}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-[#FF9F43] focus:ring-[#FF9F43]"
                  />
                  <Label
                    htmlFor="dietaryInfo.isGlutenFree"
                    className="cursor-pointer"
                  >
                    Gluten Free
                  </Label>
                </div>
              </div>
            </div>
            <div
              className="flex items-center space-x-2 p-3 rounded-lg border hover:border-[#FF9F43]
                transition-all duration-200"
            >
              <input
                type="checkbox"
                id="isSpicy"
                name="isSpicy"
                checked={formData.isSpicy}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-[#FF9F43] focus:ring-[#FF9F43]"
              />
              <Label
                htmlFor="isSpicy"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Flame className="h-4 w-4" />
                Spicy
              </Label>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="image" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Item Image
              </Label>
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed
                    rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300
                    hover:border-[#FF9F43] transition-all duration-200"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setImagePreview("");
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600
                          transition-all duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or WEBP (MAX. 2MB)
                      </p>
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
                {isUploading && (
                  <div className="mt-2 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-500">Uploading...</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#FF9F43] hover:bg-[#FF9F43]/90 cursor-pointer transition-all duration-200
            hover:scale-105"
        >
          <Plus size={16} className="mr-2" /> Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Add New Menu Item
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !formData.image}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Create Item
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItemModal;
