import React, { useEffect, useState } from "react";
import { loadDrafts, ResponseProps } from "../api/ApiServices";
import Spinner from "../loaders/Spinner";
import DraftCard from "./DraftCard";

const GetDrafts = () => {
  const [bookResponse, setBookResponse] = useState<ResponseProps | null>(null);

  useEffect(() => {
    loadDrafts(setBookResponse);
  }, []);

  if (!bookResponse) return <Spinner />;
  return (
    <div className="h-screen pb-10 pt-4 overflow-y-scroll scrollbar-hide">
      {bookResponse?.content.length ? (
        <div className="px-4 flex flex-wrap gap-4 justify-center">
          {bookResponse?.content.map((book) => (
            <div className="w-full mx-auto mt-10">
              <DraftCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className=" font-bold text-2xl lg:text-3xl">Drafts are empty</h2>
          <p className="text-zinc-500 mt-2">
            Saved but not published work will be shown here
          </p>
        </div>
      )}
    </div>
  );
};

export default GetDrafts;
