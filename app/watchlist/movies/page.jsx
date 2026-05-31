const fetchMovies = async () => {
    const response = await fetch(`${process.env.BASE_URL}/data.json`);
    const media = await response.json();
    const movies = media.filter(mv => mv.category === 'Movie')
    return movies;
}

const MoviesPage = async () => {

    const movies = await fetchMovies();

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">

        </div>
    )
}

export default MoviesPage