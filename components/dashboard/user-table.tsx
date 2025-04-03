"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  TrendingUp,
  UserCheck,
  UserPlus,
  UsersIcon,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SheetTemplate from "./sheetTemplate";
import DrawerTemplate from "./drawerTemplate";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import useUsers from "@/hooks/useUsers";
import { User } from "@/interface";
import { FaSpinner } from "react-icons/fa6";
import RevenueChart from "./RevenueChart";

interface UserDumb {
  id: string;
  name: string;
  email: string;
  role: "customer" | "seller" | "admin";
  status: "active" | "inactive" | "pending";
  joinDate: string;
  orders?: number;
  restaurant?: string;
  avatar?: string;
}

export function UserTable() {
  const usersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, totalUsers, loading, error, refetch } = useUsers(
    currentPage,
    usersPerPage,
  );

  const DumbUsers: UserDumb[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "customer",
      status: "active",
      joinDate: "2023-01-15",
      orders: 32,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "Emma Johnson",
      email: "emma.j@example.com",
      role: "customer",
      status: "active",
      joinDate: "2023-02-20",
      orders: 17,
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "3",
      name: "Luigi's Pizzeria",
      email: "contact@luigipizza.com",
      role: "seller",
      status: "active",
      joinDate: "2022-11-10",
      restaurant: "Luigi's Pizzeria",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "4",
      name: "Taco Heaven",
      email: "info@tacoheaven.com",
      role: "seller",
      status: "inactive",
      joinDate: "2022-12-05",
      restaurant: "Taco Heaven",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: "5",
      name: "Michael Adams",
      email: "michael.a@example.com",
      role: "customer",
      status: "pending",
      joinDate: "2023-05-18",
      orders: 0,
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: "6",
      name: "Admin User",
      email: "admin@fooddelivery.com",
      role: "admin",
      status: "active",
      joinDate: "2022-01-01",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "7",
      name: "Japanese Garden",
      email: "contact@japanesegarden.com",
      role: "seller",
      status: "active",
      joinDate: "2023-03-20",
      restaurant: "Japanese Garden",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: "8",
      name: "Sarah Thompson",
      email: "sarah.t@example.com",
      role: "customer",
      status: "active",
      joinDate: "2023-04-12",
      orders: 7,
      avatar: "https://i.pravatar.cc/150?img=10",
    },
  ];

  const handleDeleteUser = (id: string) => async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete("/api/user", { data: { id } });
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted successfully.",
            icon: "success",
          });
          refetch();
        }
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const userGrowthData = [
    { name: "Jan", revenue: 250 },
    { name: "Feb", revenue: 320 },
    { name: "Mar", revenue: 410 },
    { name: "Apr", revenue: 490 },
    { name: "May", revenue: 580 },
    { name: "Jun", revenue: 650 },
    { name: "Jul", revenue: 750 },
  ];

  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-700",
    inactive: "bg-red-100 text-red-700 border-red-700",
    pending: "bg-amber-100 text-amber-700 border-amber-700",
  };

  const statusLabels = {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
  };

  const customersCount = users.filter(
    (user) => user.role === "customer",
  ).length;
  const sellersCount = users.filter((user) => user.role === "seller").length;
  const adminsCount = users.filter((user) => user.role === "admin").length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mx-2">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus size={16} className="mr-2" /> Add New User
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-md
            hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold text-yellow-900">
                  {DumbUsers.length}
                </h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-600" size={14} />
                  <span className="text-xs font-medium text-green-600 ml-1">
                    {Math.round((DumbUsers.length / DumbUsers.length) * 100)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">of total</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-inner">
                <UsersIcon className="text-blue-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-md
            hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Clients
                </p>
                <h3 className="text-2xl font-bold text-blue-900">
                  {customersCount}
                </h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-600" size={14} />
                  <span className="text-xs font-medium text-green-600 ml-1">
                    {Math.round((customersCount / DumbUsers.length) * 100)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">of total</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 shadow-inner">
                <UserCheck className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-md
            hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">
                  Sellers
                </p>
                <h3 className="text-2xl font-bold text-green-900">
                  {sellersCount}
                </h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-600" size={14} />
                  <span className="text-xs font-medium text-green-600 ml-1">
                    {Math.round((sellersCount / DumbUsers.length) * 100)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">of total</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-green-200 to-green-300 shadow-inner">
                <BriefcaseBusiness className="text-amber-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-md
            hover:shadow-lg transition-all duration-300"
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">
                  Inactive Users
                </p>
                <h3 className="text-2xl font-bold text-red-900">
                  {
                    DumbUsers.filter(
                      (user: { status: string }) => user.status !== "active",
                    ).length
                  }
                </h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-red-600" size={14} />
                  <span className="text-xs font-medium text-red-600 ml-1">
                    {Math.round(
                      (DumbUsers.filter(
                        (user: { status: string }) => user.status !== "active",
                      ).length /
                        DumbUsers.length) *
                        100,
                    )}
                    %
                  </span>
                  <span className="text-xs text-gray-500 ml-1">of total</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-red-200 to-red-300 shadow-inner">
                <UserX className="text-red-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={userGrowthData} title="" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Customers</span>
                  <span className="text-sm font-medium">{customersCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${(customersCount / users.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sellers</span>
                  <span className="text-sm font-medium">{sellersCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full"
                    style={{ width: `${(sellersCount / users.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Admins</span>
                  <span className="text-sm font-medium">{adminsCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${(adminsCount / users.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Active</span>
                  </div>
                  <span className="text-sm font-medium">
                    {DumbUsers.filter((u) => u.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Inactive</span>
                  </div>
                  <span className="text-sm font-medium">
                    {DumbUsers.filter((u) => u.status === "inactive").length}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="text-sm font-medium">
                    {DumbUsers.filter((u) => u.status === "pending").length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your users and their roles here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="w-full flex justify-center items-center">
              <FaSpinner size={40} className="animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Email Address
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, idx) => {
                  return (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <TableRow
                          key={idx}
                          // onClick={() => {
                          //   setSelectedUser(user);
                          //   setIsDrawerOpen(true);
                          // }}
                          onDoubleClick={() => {
                            setSelectedUser(user);
                            setIsDrawerOpen(true);
                          }}
                          className="cursor-pointer"
                        >
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt="User image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={user.image}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={` capitalize ${
                                user.role === "Admin"
                                  ? "bg-green-500 text-green-100"
                                  : user.role === "Client"
                                    ? "bg-blue-500 text-blue-100"
                                    : user.role === "Restaurant"
                                      ? "bg-yellow-500 text-yellow-100"
                                      : user.role === "Delivery"
                                        ? "bg-purple-500 text-purple-100"
                                        : user.role === "Vendor"
                                          ? "bg-indigo-500 text-indigo-100"
                                          : ""
                                } `}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                className="cursor-pointer z-10"
                              >
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  className="text-purple-500 hover:text-purple-600 cursor-pointer"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setIsSheetOpen(true);
                                  }}
                                >
                                  Edit {user.role} Info
                                </DropdownMenuItem>
                                {user.role !== "Admin" && (
                                  <DropdownMenuItem
                                    className="cursor-pointer text-red-500"
                                    onClick={handleDeleteUser(user._id)}
                                  >
                                    Delete this {user.role}
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TooltipContent key={idx}>
                            <p>Double tap to view {user.name} activity</p>
                          </TooltipContent>
                        </TableRow>
                      </TooltipTrigger>
                    </Tooltip>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {!loading ? (
              <div>
                Showing <strong>{(currentPage - 1) * usersPerPage + 1}</strong>{" "}
                -{" "}
                <strong>
                  {Math.min(currentPage * usersPerPage, totalUsers)}
                </strong>{" "}
                of <strong>{totalUsers}</strong> users
              </div>
            ) : (
              <div className="flex items-center">
                <span>Loading...</span>
                <FaSpinner size={13} className="animate-spin" />
              </div>
            )}
          </div>
          <div className="flex">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? "" : "cursor-pointer"}`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              variant="ghost"
              size="sm"
              disabled={currentPage * usersPerPage >= totalUsers}
              className={`${currentPage * usersPerPage >= totalUsers ? "" : "cursor-pointer"}`}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
        <SheetTemplate
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <DrawerTemplate
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </Card>
    </div>
  );
}
