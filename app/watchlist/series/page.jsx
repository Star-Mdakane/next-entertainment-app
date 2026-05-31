import SearchBar from "@/components/SearchBar";
import Series from "@/components/Series";
import Trending from "@/components/Trending";

const fetchSeries = async () => {
    const response = await fetch(`${process.env.BASE_URL}/data.json`);
    const media = await response.json();
    const series = media.filter(mv => mv.category.toLowerCase() === 'tv series')
    return series;
}


const SeriesPage = async () => {

    const series = await fetchSeries();
    console.log(series);

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
            <SearchBar />
            <Trending />
            <Series />
        </div>
    )
}

export default SeriesPage