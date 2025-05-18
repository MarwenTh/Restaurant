"use client";
import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/interface";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaSpinner } from "react-icons/fa6";
import axios from "axios";

type Props = {
  selectedUser: User | null;
  setSelectedUser: (value: User) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
};

const roles = [
  { value: "Admin", label: "Admin" },
  { value: "Client", label: "Client" },
  { value: "Seller", label: "Seller" },
  { value: "Delivery", label: "Delivery" },
];

const SheetTemplate: FC<Props> = ({
  selectedUser,
  setSelectedUser,
  isSheetOpen,
  setIsSheetOpen,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState(false);

  React.useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name || "");
      setEmail(selectedUser.email || "");
      setRole(selectedUser.role || "Client");
      setImage(selectedUser.image || "");
      setImagePreview(selectedUser.image || null);
      setError(null);
      setSuccess(false);
      setTouched(false);
    }
  }, [selectedUser, isSheetOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImage(reader.result as string);
        setTouched(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError(null);
    setSuccess(false);
    if (!name || !email || !role) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.patch("/api/user", {
        _id: selectedUser?._id,
        name,
        email,
        role,
        image,
      });
      setSuccess(true);
      setTimeout(() => {
        setIsSheetOpen(false);
        setSuccess(false);
      }, 1200);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="max-w-md w-full rounded-l-3xl shadow-2xl bg-white/95 border-0">
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-[#D4AF37] mb-1">
              Edit User
            </SheetTitle>
            <SheetDescription className="text-gray-500 mb-2">
              Update user information and role. All changes are saved instantly.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="image-upload" className="cursor-pointer group">
              <Avatar className="h-20 w-20 border-2 border-[#D4AF37]/30 shadow-lg">
                <AvatarImage src={imagePreview || image} alt={name} />
                <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="block text-xs text-[#D4AF37] mt-1 group-hover:underline">
                Change Photo
              </span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setTouched(true);
                }}
                placeholder="Full Name"
                className="rounded-xl mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setTouched(true);
                }}
                placeholder="Email Address"
                className="rounded-xl mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(v) => {
                  setRole(v);
                  setTouched(true);
                }}
              >
                <SelectTrigger className="rounded-xl mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center text-sm -mt-2">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-center text-sm -mt-2">
              User updated successfully!
            </div>
          )}
          <SheetFooter className="flex flex-row gap-2 justify-end mt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl px-6"
              onClick={() => setIsSheetOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl px-6 bg-[#D4AF37] hover:bg-[#bfa13a] text-white font-semibold
                shadow-md"
              disabled={loading || !touched}
            >
              {loading ? (
                <FaSpinner className="animate-spin h-4 w-4" />
              ) : (
                "Save"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetTemplate;
