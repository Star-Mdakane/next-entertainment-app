'use client'


import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBookBookmark } from 'react-icons/fa6'
import { MdMovie } from 'react-icons/md'
import { RiFilmFill } from 'react-icons/ri'
import { TbDeviceTvOldFilled, TbLayoutGridFilled } from 'react-icons/tb'

const HeaderL = () => {

    const pathname = usePathname();

    const getLinkClass = (href) => {
        const isActive = pathname === href
        return `text-${isActive ? 'white' : 'blue-ter'}`
    }

    return (
        <header
            className='w-24 h-240 hidden lg:flex rounded-[20px] justify-center items-center bg-blue-sec'>
            <div className='w-10 h-[92%] flex flex-col justify-between items-center'>
                <div className='flex flex-col gap-18 items-center'>
                    <div>
                        <Link href="/">
                            <MdMovie className="text-[32px] text-red-pri" />
                        </Link>
                    </div>
                    <nav className='flex flex-col gap-10'>
                        <Link href="wathlist/home">
                            <TbLayoutGridFilled className={`text-[20px]  hover:text-red-pri ${getLinkClass('/watchlist/home')}`} />
                        </Link>
                        <Link href="wathlist/movies">
                            <RiFilmFill className={`text-[20px]  hover:text-red-pri ${getLinkClass('/watchlist/movies')}`} />
                        </Link>
                        <Link href="wathlist/series">
                            <TbDeviceTvOldFilled className={`text-[20px]  hover:text-red-pri ${getLinkClass('/watchlist/series')}`} />
                        </Link>
                        <Link href="wathlist/bookmarked">
                            <FaBookBookmark className={`text-[20px]  hover:text-red-pri ${getLinkClass('/watchlist/bookmarked')}`} />
                        </Link>
                    </nav>
                </div>
                <div
                    className="relative h-10 w-10 rounded-full border-2 border-white">
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

export default HeaderL