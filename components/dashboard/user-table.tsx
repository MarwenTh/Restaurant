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
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export function UserTable({}: {}) {
  const router = useRouter();
  const usersPerPage = 10;

  const prevPage = () => {
    router.back();
  };

  //   const nextPage = () => {
  //     router.push(`/?offset=${offset}`, { scroll: false });
  //   };
  const [users, setUsers] = useState<User[]>([]);
  const getAllUsers = async () => {
    const response = await axios.get("/api/user");

    console.log(response.data.users);
    setUsers(response.data.users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">
                Email Address
              </TableHead>
              <TableHead className="hidden md:table-cell">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={user.image}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                {/* <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  {user.email}
                </TableCell>
                {/* <TableCell className="hidden md:table-cell">
        {product.availableAt.toLocaleDateString("en-US")}
      </TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>
                        {/* <form action={deleteProduct}> */}
                        <button type="submit">Delete</button>
                        {/* </form> */}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {/* <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {Math.max(0, Math.min(offset - usersPerPage, totalUsers) + 1)}-
              {offset}
            </strong>{" "}
            of <strong>{totalUsers}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === usersPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + usersPerPage > totalUsers}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form> */}
      </CardFooter>
    </Card>
  );
}
