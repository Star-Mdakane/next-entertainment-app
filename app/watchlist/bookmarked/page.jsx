import Bookmark from "@/components/Bookmark";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import Loading from "./loading";

const BookmarkedPage = () => {

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
            <SearchBar />
            <Suspense fallback={<Loading />}>
                <Bookmark />
            </Suspense>
        </div>
    )
}

export default BookmarkedPage;