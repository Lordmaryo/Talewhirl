"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMenu, IoSearch } from "react-icons/io5";
import Logo from "../image/TaleWhirlFox-removebg.png";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import Link from "next/link";
import LoginPage from "../Authentication/LoginPage";
import SignUpPage from "../Authentication/SignUpPage";
import { getToken, TokenDataProps } from "../token/Token";
import checkAuthAndSetToken from "../token/Token";
import defaultProfile from "../image/default-profile.png";
import ToggleHeader from "./ToggleHeader";
import { loadUser, UserResponse } from "../api/ApiServices";
import SideBar from "./SideBar";

const Header = () => {
  const [toggleSearchButton, setToggleSearchButton] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [isLoginClicked, setIsLoginCliked] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<TokenDataProps | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [currentUserId, setCurrentUserid] = useState<number | undefined>(0);
  const [toggleMenu, setToggleMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      checkAuthAndSetToken(getToken, setIsAuthenticated, setTokenData);
      setCurrentUserid(tokenData?.id);
      if (currentUserId) {
        await loadUser(currentUserId, setUserData);
      }
    };

    fetchData();
  }, [currentUserId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInput("");
    setToggleSearchButton(false);
    router.push(`/search/${input}`);
  };

  return (
    <>
      {toggleMenu && (
        <>
          <div
            onClick={() => setToggleMenu(false)}
            className="backdrop-blur-md w-full h-full z-20 fixed"
          />
          <SideBar
            currentUserId={currentUserId}
            setToggleMenu={setToggleMenu}
            setIsLoginCliked={setIsLoginCliked}
            isLoginClicked={isLoginClicked}
          />
        </>
      )}
      <div className="sm:h-16 h-16 bg-inherit z-10 flex flex-row items-center justify-between py-5 px-3 fixed top-0 right-0 left-0">
        <div className="flex items-center justify-between gap-5">
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="py-1 px-2"
          >
            <div>
              <IoMenu size={30} />
            </div>
          </button>
          <Link className="flex flex-row items-center gap-x-2" href="/">
            <Image
              src={Logo}
              width={100}
              height={100}
              className="w-8 h-8 sm:w-10 sm:h-10 object-cover"
              alt="talewhirl logo"
            ></Image>
            <span className="sigmar-regular">TALEWHIRL</span>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="hidden sm:flex items-center mx-3 border border-[#413f3f] rounded-md p-2"
          >
            {!toggleSearchButton && (
              <span className="h-5 w-5 text-black dark:text-gray-500">
                <CiSearch size={20} />
              </span>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="sm:w-[300px] md:w-[292px] lg:w-[450px] pl-2 outline-none bg-transparent dark:placeholder:text-gray-50 placeholder:text-zinc-800"
              placeholder="Search any title"
            />
          </form>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setToggleSearchButton(!toggleSearchButton)}
            className="inline sm:hidden text-gray-400"
          >
            {toggleSearchButton ? (
              <IoMdClose size={30} />
            ) : (
              <IoSearch size={30} />
            )}
          </button>
          {isAuthenticated ? (
            <>
              <p className="lg:block hidden lg:text-sm xl:text-base">
                Welcome {userData?.firstname || "user"}!
              </p>
              <button
                onClick={() => setToggleAccount(!toggleAccount)}
                className="px-2 py-1 hidden md:flex flex-row gap-x-2 items-center font-bold"
              >
                <span>Account</span>
                {toggleAccount ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
            </>
          ) : (
            <div className="hidden md:flex items-center flex-row gap-2">
              <button
                onClick={() => setIsLoginCliked(!isLoginClicked)}
                className="bg-green-800 hover:bg-green-700 transition-colors px-5 py-2 rounded"
              >
                Login
              </button>
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="hover:bg-[#262626] border transition-colors px-5 py-2 rounded"
              >
                Sign up
              </button>
            </div>
          )}
          <button
            className="md:hidden"
            onClick={() => {
              if (isAuthenticated) {
                router.push(`/profile/${tokenData?.id}`);
              } else {
                setIsLoginCliked(!isLoginClicked);
              }
            }}
          >
            <Image
              className="h-6 w-6 rounded-full"
              src={
                !userData?.profilePic ? defaultProfile : userData?.profilePic
              }
              width={100}
              height={100}
              alt="profile"
            />
          </button>
        </div>
      </div>

      {toggleSearchButton && (
        <form
          onSubmit={handleSubmit}
          className="bg-inherit z-10 sm:hidden absolute max-w-[640px] top-16 left-0 right-0 flex items-center mx-3 border border-[#413f3f] rounded-md p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full pl-2 outline-none bg-transparent dark:placeholder:text-gray-50 placeholder:text-zinc-800"
            placeholder="Search any title"
          />
        </form>
      )}
      {isLoginClicked && <LoginPage />}
      {isSignup && <SignUpPage />}
      {toggleAccount && (
        <div className="fixed top-12 bg-inherit right-2 rounded-lg z-20">
          <ToggleHeader />
        </div>
      )}
    </>
  );
};

export default Header;
