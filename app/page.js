'use client'

import Link from "next/link";
import { MdMovie } from "react-icons/md";
import { useMovie } from "@/context/MovieContext"
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const { user, filteredMovies } = useMovie()
  const [bgMovies, setBgMovies] = useState([])

  useEffect(() => {
    const shuffled = filteredMovies
      .filter(m => m.thumbnail?.regular.medium)
      .sort(() => 0.5 - Math.random())
      .slice(0, 24)
    setBgMovies(shuffled)
  }, [filteredMovies])


  return (

    <main className="relative w-screen h-screen flex flex-col max-w-360 mx-auto justify-center px-8 overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 grid-rows-3 gap-2 opacity-40 blur-sm scale-110 h-full">
        {bgMovies.map((movie, i) => (
          <div key={movie.id ?? i} className="relative w-full aspect-video">
            <Image
              src={movie.thumbnail.regular.medium}
              alt=""
              fill
              className="object-cover"
              unoptimized
              priority={i < 6}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/70" />

      <div className="w-full translate-y-8 z-20 flex justify-between items-center">
        <Link href="/">
          <MdMovie className="text-[25px] md:text-[32px] text-red-pri" />
        </Link>

        {user ? (
          <div className="flex gap-3">
            <Link href="/watchlist/home"
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
      <div className="w-full z-10 flex flex-col flex-1 justify-center items-center text-center">
        <h2 className="w-1/2 md:w-1/3 text-xl md:text-3xl leading-[125%] tracking-[-0.3] text-white font-medium">Watch the latest movies, TV series and more.</h2>
        <p className="w-1/2 text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] text-blue-ter font-light mt-8 md:mt-15">Login in to get lost in the a universe of entertainment</p>
      </div>
    </main>
  );
}
