import React, { useState } from "react";
import { Book, deleteBook } from "../api/ApiServices";
import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "../utilities/Helpers";
import Button from "./Button";

type BookResultsCardProps = {
  book: Book;
};

const BookResultsCard = ({ book }: BookResultsCardProps) => {
  const [clickedDelete, setClickedDelete] = useState(false);
  const triggerDelete = () => {
    setClickedDelete(!clickedDelete);
  };

  return (
    <>
      {clickedDelete && (
        <div
          className="p-4 text-center flex flex-col justify-center items-center gap-4 m-auto z-10 bg-[#383838]
           rounded-md sm:max-w-[400px] w-[80%] md:max-w-[620px] h-[300px] fixed
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div>
            <h2 className="text-xl pb-2">Are you sure you want to delete</h2>
            <span className="font-bold pt-2">{book.title}</span>
          </div>
          <p className="text-red-500 text-sm">
            Actions can NOT be undone and all data about this book will be lost.
          </p>
          <Button
            className="bg-red-500"
            label="Yes, delete"
            onClick={() => {
              deleteBook(book?.id);
              setClickedDelete(!clickedDelete);
            }}
          />
          <Button
            className="bg-transparent"
            label="Cancel"
            onClick={() => setClickedDelete(false)}
          />
        </div>
      )}
      <div className="relative">
        <Link
          href={"/details/" + book?.id}
          className="w-full py-2 flex flex-row gap-x-3"
        >
          <Image
            src={`data:image/jpeg;base64,${book?.cover}`}
            className="w-16 h-24 md:w-28 md:h-40 object-cover rounded-md"
            width={100}
            height={100}
            alt="book covers"
          />
          <div>
            <h2 className="font-bold text-base sm:text-xl">{book?.title}</h2>
            <div className="text-zinc-400 text-sm flex flex-row items-center gap-x-4">
              <span>{book?.numOfChapters} chapters</span>
              <span>{timeAgo(book?.createdDate)}</span>
            </div>
            <div className="text-zinc-500 text-sm flex flex-row items-center gap-4 py-1">
              {book?.genres
                .map((g, index) => <span key={index}>{g}</span>)
                .slice(0, 3)}
            </div>
            <p className="text-sm">{book?.synopsis}</p>
          </div>
        </Link>
        <button
          onClick={triggerDelete}
          className="absolute bottom-2 right-4 text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default BookResultsCard;
