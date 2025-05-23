"use client";
import Button from "./Button";
import GenreSelector from "../utilities/GenreSelector";
import { Book } from "../api/ApiServices";

type BookDetailsProps = {
  setPgRating: (pgRating: number) => void;
  setTitle: (title: string) => void;
  setSynopsis: (synopsis: string) => void;
  setGenres: (genres: string[]) => void;
  setActiveTabs: (activeTabs: string) => void;
  title: string;
  synopsis: string;
  genres: string[];
  pgRating: number;
  book: Book | null;
};

const EditBookDetails: React.FC<BookDetailsProps> = ({
  setTitle,
  setSynopsis,
  setPgRating,
  setGenres,
  setActiveTabs,
  title,
  synopsis,
  genres,
  pgRating,
}) => {
  return (
    <div className="py-4 max-w-[800px] mx-auto space-y-4">
      <div className="flex flex-col gap-4">
        <label className="font-bold" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
          name="title"
          value={title}
          className="p-2 bg-transparent"
          id="title"
          placeholder="title"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-bold" htmlFor="overview">
          Overview
        </label>
        <textarea
          maxLength={250}
          onChange={(e) => setSynopsis(e.target.value)}
          required
          className="p-2 h-40 bg-transparent"
          value={synopsis}
          id="overview"
          name="synopsis"
          placeholder="overview"
        />
      </div>
      <div>
        <label className="font-bold pr-2" htmlFor="pg-rating">
          Target Audience
        </label>
        <select
          name="pgRating"
          className="p-2 bg-black text-white"
          id="pg-rating"
          required
          value={pgRating}
          onChange={(e) => setPgRating(parseInt(e.target.value))}
        >
          <option value={0}>Select Ratings</option>
          <option value={13}>13+</option>
          <option value={16}>16+</option>
          <option value={18}>18+</option>
          <option value={22}>22+</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="genres" className="flex flex-col gap-1">
          <span className="font-bold">Genres</span>
          <span className="text-sm text-zinc-500">
            genres must be between 3 and 5
          </span>
        </label>
        <div className="flex flex-wrap gap-4" id="genres">
          <GenreSelector setGenres={setGenres} genres={genres} />
          {genres.length > 0 && (
            <div
              className="bg-[#383838] p-2 rounded-md scrollbar-hide overflow-auto 
            max-h-32 font-bold flex flex-col text-sm gap-2"
            >
              {genres.map((genre, index) => (
                <span key={index}>{genre}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button
        className="w-full"
        label="Continue writing!"
        type="button"
        onClick={() => {
          setActiveTabs("Story");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default EditBookDetails;
