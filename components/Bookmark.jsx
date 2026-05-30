const Bookmark = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <h2 className="text-[20px] md:text-[32px] text-white leading-[125%] tracking-[-0.3px] font-light">Bookmarked Movies</h2>
                <div></div>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="text-[20px] md:text-[32px] text-white leading-[125%] tracking-[-0.3px] font-light">Bookmarked TV Series</h2>
                <div></div>
            </div>
        </div>
    )
}

export default Bookmark