const fetchMovies = async () => {
    const response = await fetch(`${process.env.BASE_URL}/data.json`);
    const media = await response.json();
    const movies = media.filter(mv => mv.category === 'Movie')
    return movies;
}

const MoviesPage = async () => {

    const movies = await fetchMovies();

    return (
        <div>{movies}</div>
    )
}

export default MoviesPage