import Bookmark from "@/components/Bookmark";
import SearchBar from "@/components/SearchBar";
import Trending from "@/components/Trending";

const fetchBookmarked = async () => {
    const response = await fetch(`${process.env.BASE_URL}/data.json`);
    const media = await response.json();
    const bookmarked = media.filter(mv => mv.isBookmarked === true)
    return bookmarked;
}

const BookmarkedPage = async () => {

    const bookmarked = await fetchBookmarked();
    console.log(bookmarked);
    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
            <SearchBar />
            <Bookmark />
        </div>
    )
}

export default BookmarkedPage;