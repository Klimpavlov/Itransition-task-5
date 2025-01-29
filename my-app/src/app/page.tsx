'use client';

import Image from "next/image";
import {getBooksList} from "@/app/api/getBooks";
import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {

  const [users, setUsers] = useState([]);

  async function getBooks() {
    const booksData = await getBooksList();
    console.log(booksData);
    setUsers(booksData);
  }

  useEffect(() => {
    getBooks();
  }, []);


  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ISBN</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author(s)</TableHead>
              <TableHead className="text-right">Publisher</TableHead>
            </TableRow>
          </TableHeader>
          {users.map((user) => (
            <TableBody>
              <TableRow>
                <TableCell key="isbn" className="font-medium">{user.isbn}</TableCell>
                <TableCell key="title">{user.title}</TableCell>
                <TableCell key="author">{user.author}</TableCell>
                <TableCell key="publisher" className="text-right">{user.publisher}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>

      </main>
    </div>
  );
}
