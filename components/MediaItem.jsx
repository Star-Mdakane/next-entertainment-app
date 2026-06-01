import { FaBookmark, FaRegBookmark } from "react-icons/fa6"
import { RiFilmFill } from "react-icons/ri"
import { TbDeviceTvOldFilled } from "react-icons/tb"

const MediaItem = ({ media }) => {
    const movie = media.category.toLowerCase() === 'movie'
    const bookmarked = media.isBookmarked === true;
    const imagePath = media.thumbnail.regular.large;


    return (
        <div className="flex flex-col justify-between gap-2">
            <div className={`h-27.5 md:h-35 lg:h-44 flex justify-between rounded-lg bg-green-500 w-full px-2 py-4`}
                style={{
                    backgroundImage: `url(${imagePath})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <button className="w-8 h-8 bg-black/50 grid place-content-center ml-auto rounded-full">
                    {bookmarked ? <FaRegBookmark className="text-white" /> : <FaBookmark className="text-white" />}
                </button>
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