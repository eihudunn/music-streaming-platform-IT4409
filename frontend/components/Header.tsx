"use client";

import { useRouter } from "next/navigation";
import { BiHome, BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { signOut, useSession } from "next-auth/react";
import Button from "./Button";
import Image from "next/image";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { status, data: session } = useSession();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleLogout = () => {};
  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white hover:placeholder-opacity-75 flex items-center justify-center transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white hover:placeholder-opacity-75 flex items-center justify-center transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {status === "authenticated" ? (
            <>
              <div>
                <Button
                  onClick={() => signOut()}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign out
                </Button>
              </div>
              <div>
                <Image
                  alt="avt"
                  className="rounded-full"
                  src={session?.user?.image as string}
                  width={60}
                  height={60}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Button
                  onClick={handleSignup}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={handleLogin} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
