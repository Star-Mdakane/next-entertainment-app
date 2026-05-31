import Link from "next/link";
import { MdMovie } from "react-icons/md";

export default function Home() {
  console.log(require('crypto').randomBytes(32).toString('hex'));

  return (

    <main className="w-screen h-screen flex flex-col max-w-360 mx-auto justify-center md:mt-8 px-8">
      {/* Absolute overlay background */}

      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <MdMovie className="text-[25px] md:text-[32px] text-red-pri" />
        </Link>

        <Link href="/login"
          className="px-4 py-2 text-[15px] leading-[125%] tracking-normal text-white font-medium bg-red-pri rounded-[5px]">
          Login
        </Link>
      </div>
      <div className="w-full flex flex-col flex-1 justify-center items-center text-center">
        <h2 className="w-1/3 text-3xl leading-[125%] tracking-normal text-white font-medium">Watch the latest movies, TV series and more.</h2>
        <p className="w-1/2 text-[15px] leading-[125%] tracking-normal text-blue-ter font-light mt-15">Login in to get lost in the a universe of entertainment</p>
      </div>
    </main>
  );
}
