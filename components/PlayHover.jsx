import React from 'react'
import { FaCirclePlay } from 'react-icons/fa6'

const PlayHover = () => {
    return (
        <div className='absolute z-20 inset-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
            <div className='bg-white/25 p-3 w-28 h-12 scale-75 flex gap-4 justify-start items-center rounded-[28px]'>
                <FaCirclePlay className='text-white text-[30px]' />
                <p className='text-[18px] leading-[125%] tracking-normal text-white font-normal'>Play</p>
            </div>
        </div>
    )
}

export default PlayHover