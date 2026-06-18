import { useMovie } from "@/context/MovieContext"
import { FaBookmark, FaRegBookmark } from "react-icons/fa6"
import { RiFilmFill } from "react-icons/ri"
import { TbDeviceTvOldFilled } from "react-icons/tb"
import PlayHover from "./PlayHover"

const MediaItem = ({ media }) => {
    const { toggleBookmark, marked } = useMovie()

    const movie = media.category?.toLowerCase() === 'movie'
    const key = `${media.title}-${media.year}`
    const bookmarked = marked.includes(key)
    const imagePath = media.thumbnail?.regular.large;

    return (
        <div className="flex flex-col justify-between gap-2 overflow-hidden">

            <div className={`relative overflow-hidden h-27.5 md:h-35 lg:h-44 flex justify-between rounded-lg w-full px-2 py-4 group`}
                style={{
                    backgroundImage: `url(${imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <button
                    onClick={() => toggleBookmark(key, media.title)}
                    className="w-8 h-8 z-70 bg-black/50 grid place-content-center ml-auto rounded-full">
                    {bookmarked ? <FaBookmark className="text-white" /> : <FaRegBookmark className="text-white/70 hover:text-white" />}
                </button>
                <PlayHover />
            </div>
            <div className="h-10 md:h-12 flex flex-col gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <p className="text-white/75 text-[11px] md:text-[13px] leading-[125%] tracking-[-0.3] font-light">{media.year}</p>
                    <div className="w-0.75 h-0.75 bg-white/50"></div>
                    <div className="flex items-center gap-1.5">
                        {movie ? <RiFilmFill className="text-white text-[12px]" /> : <TbDeviceTvOldFilled className="text-white text-[12px]" />}
                        <p className="text-white/75  text-[11px] md:text-[13px] leading-[125%] tracking-[-0.3] font-light">{movie ? 'Movie' : 'TV Series'}</p>
                    </div>
                    <div className="w-0.75 h-0.75 bg-white/50"></div>
                    <p className="text-white/75  text-[11px] md:text-[13px] leading-[125%] tracking-[-0.3] font-light">{media.rating}</p>
                </div>
                <p className="text-[14px] md:text-[18px] text-white leading-[125%] tracking-[-0.3] font-medium">
                    {media.title}
                </p>
            </div>
        </div>
    )
}

export default MediaItem