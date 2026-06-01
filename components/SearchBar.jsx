'use client'

import { useMovie } from "@/context/MovieContext";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const SearchBar = () => {

    const { searchTerm, setSearchTerm } = useMovie();


    return (
        <div
            className="w-full flex items-center gap-4 md:gap-6">
            <span>
                <PiMagnifyingGlassBold className="text-white text-[24px] md:text-[32px] ml-1" />
            </span>
            <input type="text" name="search" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search for movies or TV series" className="w-full text-[16px] md:text-[24px] leading-[125%] tracking-normal font-light text-white focus:outline-none focus:border-blue-ter hover:border-blue-ter caret-red-pri border-b border-transparent p-3 cursor-pointer transition-all" />
        </div>
    )
}

export default SearchBar