"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

const Users = () => {
  return (
    <>
      {users.map((user: User) => (
        <TableRow>
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
          <TableCell className="hidden md:table-cell">{user.email}</TableCell>
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
    </>
  );
};

export default Users;
