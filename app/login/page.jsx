'use client'

import Link from "next/link";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MdMovie } from "react-icons/md";
import { useMovie } from "@/context/MovieContext"

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, "Can't be empty"),
})

const LoginPage = () => {
    const [serverError, setServerError] = useState('')
    const router = useRouter()
    const { setUser } = useMovie()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data) => {
        setServerError('')
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (res.ok) {
                setUser(result.user)
                router.refresh()
                router.push('/watchlist')
            } else {
                setServerError(result.error || 'Invalid credentials')
            }

        } catch (err) {
            setServerError('Something went wrong. Try again.')
        }
    }

    return (

        <div className="flex flex-col mt-12 md:mt-20 items-center gap-14 md:gap-20">
            <div>
                <Link href="/">
                    <MdMovie className="text-[32px] text-red-pri" />
                </Link>
            </div>
            <form
                className="card"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1
                    className='text-[32px] text-white font-light leading-[125%] tracking-[-0.5px]'>Login</h1>
                <div className="flex flex-col gap-6">
                    <label className="flex justify-between">
                        <input type="email" name="email" {...register('email')} placeholder="Email Address" className="w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none focus:border-white hover:border-white caret-red-pri border-b border-blue-ter p-3 cursor-pointer transition-all" autoComplete="off" />
                        {errors.email && <p className="text-red-pri text-sm mt-1">{errors.email.message}</p>}

                    </label>
                    <div
                        className="flex justify-between">
                        <input type="password" name="password" {...register('password')} placeholder="Password" className="w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none focus:border-white hover:border-white caret-red-pri border-b border-blue-ter p-3 cursor-pointer transition-all" />
                        {errors.password && <p className="text-red-pri text-sm mt-1">{errors.password.message}</p>}

                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <button
                        disabled={isSubmitting}
                        type="submit" className='w-full rounded-md h-12 bg-red-pri text-white text-[15px] leading-[125%] tracking-normal font-light'>
                        {isSubmitting ? 'Logging in...' : 'Login to your account'}
                    </button>
                    <p className='text-white text-[15px] text-center leading-[125%] tracking-normal font-light'> Don&apos;t have an account? <Link className="text-red-pri" href="/signup">Sign Up</Link></p>
                </div>
            </form>
            {serverError && <p className="text-red-pri text-sm mt-1">{serverError}</p>}
        </div>
    )
}

export default LoginPage;