import Bookmark from "@/components/Bookmark";
import SearchBar from "@/components/SearchBar";
import Trending from "@/components/Trending";

const BookmarkedPage = () => {

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
            <SearchBar />
            <Bookmark />
        </div>
    )
}

export default BookmarkedPage;