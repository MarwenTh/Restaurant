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
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export function UserTable() {
  const usersPerPage = 5;
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getAllUsers = async (page: number) => {
    try {
      const response = await axios.get(
        `/api/user?page=${page}&limit=${usersPerPage}`
      );
      setUsers(response.data.users);
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers(currentPage);
  }, [currentPage]);

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
          getAllUsers(currentPage);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage your users and their roles here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">
                Email Address
              </TableHead>
              <TableHead className="hidden md:table-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, idx) => (
              <Tooltip>
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
                    className="cursor-pointer "
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
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                      capitalize
                      ${
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
                      }
                    `}
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
                            <MoreHorizontal className="h-4 w-4 " />
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
                            Edit User Info
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-red-500 "
                            onClick={handleDeleteUser(user.id)}
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TooltipContent key={idx}>
                      <p>Double tap to view {user.name} details</p>
                    </TooltipContent>
                  </TableRow>
                </TooltipTrigger>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(currentPage - 1) * usersPerPage + 1}</strong> -{" "}
          <strong>{Math.min(currentPage * usersPerPage, totalUsers)}</strong> of{" "}
          <strong>{totalUsers}</strong> users
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
            className={`${
              currentPage * usersPerPage >= totalUsers ? "" : "cursor-pointer"
            }`}
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
  );
}
