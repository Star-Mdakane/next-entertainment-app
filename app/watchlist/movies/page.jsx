import Movies from "@/components/Movies";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import Loading from "./loading";

const MoviesPage = () => {

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
            <SearchBar />
            <Suspense fallback={<Loading />}>
                <Movies />
            </Suspense>
        </div>
    )
}

export default MoviesPage