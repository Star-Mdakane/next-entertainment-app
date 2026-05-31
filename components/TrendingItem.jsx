'use client'

import { FaBookmark } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa6"
import { RiFilmFill } from "react-icons/ri"
import { TbDeviceTvOldFilled } from "react-icons/tb"

const TrendingItem = () => {
    return (
        <div
            className={`h-full flex flex-col justify-between rounded-lg shrink-0 bg-green-500 w-60 md:w-117 overflow-hidden px-6 py-4`}>
            <div className="w-8 h-8 bg-black/50 grid place-content-center ml-auto rounded-full">
                <FaRegBookmark className="text-white" />
                {/* <FaBookmark className="text-white" /> */}
            </div>
            <div className="h-auto flex flex-col justify-between gap-2">
                <div className="flex items-center gap-2">
                    <p className="text-white/75 text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] font-light">2019</p>
                    <div className="w-0.75 h-0.75 bg-white/50"></div>
                    <div className="flex items-center gap-1.5">
                        <RiFilmFill className="text-white text-[12px]" />
                        {/* <TbDeviceTvOldFilled className="text-white text-[12px]" /> */}
                        <p className="text-white/75  text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] font-light">Movie</p>
                    </div>
                    <div className="w-0.75 h-0.75 bg-white/50"></div>
                    <p className="text-white/75  text-[12px] md:text-[15px] leading-[125%] tracking-[-0.3] font-light">PG</p>
                </div>
                <p className="text-[15px] md:text-[24px] text-white leading-[125%] tracking-[-0.3] font-medium">
                    Beyond Earth
                </p>
            </div>
        </div>
    )
}

export default TrendingItem