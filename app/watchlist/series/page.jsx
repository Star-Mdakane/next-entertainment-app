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
        <div>SeriesPage</div>
    )
}

export default SeriesPage