'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { TbLogout2 } from 'react-icons/tb'

const LogoutButton = () => {

    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' })
        router.push('/login')
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className={`px-4 py-2 text-[15px] leading-[125%] tracking-[-0.3] text-white font-medium bg-red-pri rounded-[5px]`}
        >
            <TbLogout2 size={18} />
        </button>
    )
}

export default LogoutButton