import Image from "next/image";
import { Book } from "../api/ApiServices";
import { FaRegClock, FaStar } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { averageReadTime, interval, truncateWord } from "../utilities/Helpers";

type HeroCardProps = {
  book: Book;
  numbering: number;
};

const Herocard = ({ book, numbering }: HeroCardProps) => {
  const chapter = book.chapters;
  const readTime = averageReadTime(chapter);

  return (
    <div className="relative">
      <Image
        className="w-full object-cover md:h-screen"
        priority={true}
        src={`data:image/jpeg;base64,${book.backgroundCover}`}
        width={100}
        height={100}
        alt="book backgroud cover"
      />
      <div className="absolute bottom-0 h-full w-full bg-gradient-to-r from-[#171717] to-transparent">
        <h2 className="absolute top-5 sm:text-base text-sm left-8 font-bold text-[#ffffff71]">
          Top trending
        </h2>
        <div className="pb-20 md:pl-10 p-5 absolute md:bottom-0 -bottom-14  lg:w-1/2 md:w-[70%] sm:w-[60%]">
          <h1 className="text-3xl font-bold text-[#ffffff82] sm:text-4xl md:text-5xl lg:text-6xl">
            {numbering < 9 && 0}
            {numbering + 1}
          </h1>
          <div>
            <p className="sigmar-regular text-xl font-bold md:text-3xl lg:text-4xl">
              {book.title}
            </p>
          </div>
          <div className="hidden flex-row items-center gap-2 mt-2 text-sm sm:flex">
            <div className="divide-x-2 text-zinc-400">
              {book.genres
                ?.map((g, index) => (
                  <span className="px-2" key={index}>
                    {g}
                  </span>
                ))
                .slice(0, 3)}
            </div>
            <div className="flex flex-row items-center gap-1 text-zinc-400">
              <FaRegClock />
              <span>{interval(readTime)}</span>
            </div>
            <div className="flex flex-row items-center gap-1 text-zinc-400">
              <FaStar />
              <span>{!book.rate ? "0.0" : book.rate}</span>
            </div>
          </div>
          <p className="pt-2 hidden sm:block md:text-base text-sm">
            {truncateWord(book.synopsis, 100)}
          </p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <Link href={`/read/${book.id}/${book.title.replace(/\s+/g, "-")}`}>
              <button className="flex flex-row items-center gap-1 font-semibold hover:bg-[#ffffffba] transition-colors bg-white text-black sm:px-4 px-3 py-1 rounded-lg">
                <FiBookOpen />
                <span>Read now</span>
              </button>
            </Link>
            <Link href={"/details/" + book.id}>
              <button className="flex flex-row items-center gap-1 font-semibold rounded-lg hover:bg-[#ffffff10] transition-colors text-white border py-1 px-2">
                <span>Details</span>
                <MdOutlineKeyboardArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herocard;
