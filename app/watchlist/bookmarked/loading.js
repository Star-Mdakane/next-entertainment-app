export default function Loading() {
    return (
        <div className='w-full flex items-center justify-center h-screen bg-blue-dark'>
            <div className='w-full h-full flex flex-col items-center gap-4'>
                <div className='w-12 h-12 border-4 border-blue-ter border-t-red-pri rounded-full animate-spin'></div>
                <h1 className='text-2xl text-white'>Loading...</h1>
            </div>
        </div>
    )
}