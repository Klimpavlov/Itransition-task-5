'use client';

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

  const [books, setBooks] = useState([]);
  const [lang, setLang] = useState("en");
  const [seed, setSeed] = useState("42");

  async function getBooks() {
    const booksData = await getBooksList({ lang, seed });
    console.log(booksData);
    setBooks(booksData);
  }

  useEffect(() => {
    getBooks();
  }, [lang]);

  function generateRandomSeed() {
    const newSeed = Math.floor(Math.random() * 1000000).toString();
    setSeed(newSeed);

  }


  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="mb-4 p-2 border">
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
        </select>
        <label>Seed:</label>
        <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="mb-4 p-2 border"
        />
        <button onClick={generateRandomSeed} className="p-2 border">🔀 Random Seed</button>

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
          <TableBody>
            {books.map((book, index) => (
                <TableRow key={book.isbn || index}>
                  <TableCell className="font-medium">{book.isbn}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className="text-right">{book.publisher}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>

      </main>
    </div>
  );
}
