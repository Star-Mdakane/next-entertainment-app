'use client'

import Link from "next/link";
import { MdMovie } from "react-icons/md";
import { useMovie } from "@/context/MovieContext"
import LogoutButton from "@/components/LogoutButton";

export default function Home() {

  const { user } = useMovie()

  return (

    <main className="w-screen h-screen flex flex-col max-w-360 mx-auto justify-center mt-8 px-8">
      {/* Absolute overlay background */}

      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <MdMovie className="text-[25px] md:text-[32px] text-red-pri" />
        </Link>

        {user ? (
          <div className="flex gap-3">
            <Link href="/watchlist"
              className="px-4 py-2 text-[15px] leading-[125%] tracking-[-0.3] text-white font-medium bg-red-pri rounded-[5px]">
              Go to Watchlist
            </Link>
            <LogoutButton />
          </div>

        ) : (
          <Link href="/login"
            className="px-4 py-2 text-[15px] leading-[125%] tracking-[-0.3] text-white font-medium bg-red-pri rounded-[5px]">
            Login
          </Link>
        )}
      </div>
      <div className="w-full flex flex-col flex-1 justify-center items-center text-center">
        <h2 className="w-1/2 md:w-1/3 text-xl md:text-3xl leading-[125%] tracking-[-0.3] text-white font-medium">Watch the latest movies, TV series and more.</h2>
        <p className="w-1/2 text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] text-blue-ter font-light mt-8 md:mt-15">Login in to get lost in the a universe of entertainment</p>
      </div>
    </main>
  );
}
