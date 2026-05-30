const fetchMedia = async () => {
    const response = await fetch(`${process.env.BASE_URL}/data.json`);
    const media = await response.json();
    return media;

}

const HomePage = async () => {

    const media = await fetchMedia();

    return (
        <div className="text-white">
            {media.map(m =>
            (<p
                key={m.title}>
                {m.title}
            </p>
            ))
            }
        </div>
    )
}

export default HomePage