import TrendingItem from './TrendingItem'

const Trending = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-[20px] md:text-[32px] text-white leading-[125%] tracking-[-0.3px] font-light">Trending</h2>
            <div className='w-full overflow-x-auto scroll-smooth scrollbar-none h-35 md:h-58 flex gap-4 md:gap-10 flex-nowrap'>
                <TrendingItem />
                <TrendingItem />
                <TrendingItem />
                <TrendingItem />
                <TrendingItem />
                <TrendingItem />
                <TrendingItem />
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
                <div className='h-full rounded-lg shrink-0 bg-yellow-300 w-60 md:w-117 overflow-hidden'></div>
            </div>
        </div>
    )
}

export default Trending