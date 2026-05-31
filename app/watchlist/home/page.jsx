import Media from "@/components/Media";
import SearchBar from "@/components/SearchBar";
import Trending from "@/components/Trending";

const fetchMedia = async () => {
    const response = await fetch(`${process.env.BASE_URL}/data.json`);
    const media = await response.json();
    return media;

}

const HomePage = async () => {

    const media = await fetchMedia();
    console.log(media);

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
            <SearchBar />
            <Trending />
            <Media />
        </div>
    )
}

export default HomePage