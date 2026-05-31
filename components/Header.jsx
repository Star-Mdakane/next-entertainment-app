'use client'

import { MdMovie } from "react-icons/md"
import Link from 'next/link';
import { TbDeviceTvOldFilled, TbLayoutGridFilled } from "react-icons/tb";
import { RiFilmFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import Image from "next/image";
import { usePathname } from "next/navigation";


const Header = () => {

    const pathname = usePathname();

    const getLinkClass = (href) => {
        const isActive = pathname === href
        return `text-${isActive ? 'white' : ''}`
    }

    return (
        <header
            className="w-screen -translate-x-8 md:translate-x-0 md:static md:max-w-full h-14 md:h-18 md:rounded-[10px] px-8 lg:hidden flex justify-center items-center bg-blue-sec">
            <div className="w-full flex justify-between items-center">
                <div>
                    <Link href="/">
                        <MdMovie className="text-[25px] md:text-[32px] text-red-pri" />
                    </Link>
                </div>
                <nav className="flex items-center gap-6 md:gap-8">
                    <Link href="/watchlist/home">
                        <TbLayoutGridFilled className={`text-[16px] md:text-[20px] text-blue-ter hover:text-red-pri ${getLinkClass('/watchlist/home')}`} />
                    </Link>
                    <Link href="/watchlist/movies">
                        <RiFilmFill className={`text-[16px] md:text-[20px] text-blue-ter hover:text-red-pri ${getLinkClass('/watchlist/movies')}`} />
                    </Link>
                    <Link href="/watchlist/series">
                        <TbDeviceTvOldFilled className={`text-[16px] md:text-[20px] text-blue-ter hover:text-red-pri ${getLinkClass('/watchlist/series')}`} />
                    </Link>
                    <Link href="/watchlist/bookmarked">
                        <FaBookmark className={`text-[16px] md:text-[20px] text-blue-ter hover:text-red-pri ${getLinkClass('/watchlist/bookmarked')}`} />
                    </Link>
                </nav>
                <div
                    className="relative w-6 h-6 md:h-8 md:w-8 rounded-full border-2 border-white">
                    <Image
                        src="/image-avatar.png"
                        alt="avatar"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </header>
    )
}

export default Header;