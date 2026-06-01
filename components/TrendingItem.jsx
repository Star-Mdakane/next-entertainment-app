'use client'

import { useMovie } from "@/context/MovieContext"
import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa6"
import { RiFilmFill } from "react-icons/ri"
import { TbDeviceTvOldFilled } from "react-icons/tb"

const TrendingItem = ({ media }) => {
    const movie = media.category.toLowerCase() === 'movie'
    const bookmarked = media.isBookmarked === true;
    const imagePath = media.thumbnail.trending.large;


    return (
        <div
            className={`h-full flex flex-col justify-between rounded-lg shrink-0 w-60 md:w-117 overflow-hidden px-6 py-4`}
            style={{
                backgroundImage: `url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <button className="w-8 h-8 bg-black/50 grid place-content-center ml-auto rounded-full">
                {bookmarked ? <FaBookmark className="text-white" /> : <FaRegBookmark className="text-white" />}
            </button>
            <div className="h-auto flex flex-col justify-between gap-2">
                <div className="flex items-center gap-2">
                    <p className="text-white/75 text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] font-light">{media.year}</p>
                    <div className="w-0.75 h-0.75 bg-white/50"></div>
                    <div className="flex items-center gap-1.5">
                        {movie ? <RiFilmFill className="text-white text-[12px]" /> : <TbDeviceTvOldFilled className="text-white text-[12px]" />}
                        <p className="text-white/75  text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] font-light">{movie ? 'Movie' : 'TV Series'}</p>
                    </div>
                    <div className="w-0.75 h-0.75 bg-white/50"></div>
                    <p className="text-white/75  text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] font-light">{media.rating}</p>
                </div>
                <p className="text-[15px] md:text-[24px] text-white leading-[125%] tracking-[-0.3] font-medium">
                    {media.title}
                </p>
            </div>
        </div>
    )
}

export default TrendingItem