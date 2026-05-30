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
        <div>BookmarkedPage</div>
    )
}

export default BookmarkedPage