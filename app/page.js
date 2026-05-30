import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { MdMovie } from "react-icons/md";

export default function Home() {
  return (

    <main className="flex flex-col md:mt-20">
      <header
        className="w-screen md:w-[80%] mx-auto h-14 md:h-18 md:rounded-[10px] flex justify-center items-center bg-blue-sec">
        <div className="w-[85%] md:w-[80%] flex justify-between items-center">
          <div>
            <Link href="/">
              <MdMovie className="text-[25px] md:text-[32px] text-red-pri" />
            </Link>
          </div>
          <Link href="/login"
            className="px-4 py-2 text-[15px] leading-[125%] tracking-normal text-white font-medium bg-red-pri rounded-[5px]">
            Login
          </Link>
        </div>
      </header>
      <div>
        Media
      </div>
    </main>
  );
}
