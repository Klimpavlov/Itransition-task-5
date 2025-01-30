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
    const [likesAvg, setLikesAvg] = useState(0);
    const [reviewsAvg, setReviewsAvg] = useState(0);

    async function getBooks() {
        const booksData = await getBooksList({lang, seed, likesAvg, reviewsAvg});
        console.log(booksData);
        setBooks(booksData);
    }

    useEffect(() => {
        getBooks();
    }, [lang, seed, likesAvg, reviewsAvg]);

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
                <div className=''>
                    <div>
                        <label>Seed:</label>
                        <input
                            type="text"
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                            className="mb-4 p-2 border"
                        />
                    </div>
                </div>
                <button onClick={generateRandomSeed} className="p-2 border">🔀 Random Seed</button>
                <label>Average Likes:</label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={likesAvg}
                    onChange={(e) => setLikesAvg(parseFloat(e.target.value))}
                    className="mb-4 w-full"
                />

                <label>Average Reviews:</label>
                <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={reviewsAvg}
                    onChange={(e) => setReviewsAvg(parseFloat(e.target.value))}
                    className="mb-4 p-2 border"
                />
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ISBN</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author(s)</TableHead>
                            <TableHead className="text-right">Publisher</TableHead>
                            <TableHead>Likes</TableHead>
                            <TableHead>Reviews</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow key={book.isbn || index}>
                                <TableCell className="font-medium">{book.isbn}</TableCell>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell className="text-right">{book.publisher}</TableCell>
                                <TableCell>{book.likes}</TableCell>
                                <TableCell>{book.reviews}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </main>
        </div>
    );
}
