'use client'

import Link from "next/link";
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MdMovie } from "react-icons/md";
import { useMovie } from "@/context/MovieContext"
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, "Can't be empty"),
})

const LoginPage = () => {
    const router = useRouter()
    const [serverError, setServerError] = useState('')
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
                credentials: 'include',
                body: JSON.stringify(data)
            })
            const result = await res.json()

            if (res.ok) {
                setUser(result.user)
            } else {
                setServerError(result.error || 'Invalid credentials')
            }

        } catch (err) {
            setServerError('Network error')

        } finally {
            setServerError('')
            setTimeout(() => window.location.href = window.location.origin + '/login', 800)
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
                    <label className="relative flex justify-between items-center">
                        <input type="email" name="email" {...register('email')} placeholder="Email Address" className={`w-full pr-3 text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none ${errors.email ? 'focus:border-red-pri' : 'focus:border-white'} hover:border-white caret-red-pri border-b ${errors.email ? 'border-red-pri' : 'border-blue-ter'} p-3 cursor-pointer transition-all`} />
                        {errors.email && <p className="absolute text-red-pri text-sm mt-1 flex-nowrap shrink-0 right-0 top-1/2 -translate-y-1/2">{errors.email.message}</p>}
                    </label>
                    <div
                        className="relative flex justify-between items-center">
                        <input type="password" name="password" {...register('password')} placeholder="Password" className={`w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none ${errors.password ? 'focus:border-red-pri' : 'focus:border-white'}  hover:border-white caret-red-pri border-b  ${errors.password ? 'border-red-pri' : 'border-blue-ter'} p-3 cursor-pointer transition-all`} />
                        {errors.password && <p className="absolute text-red-pri text-sm mt-1 flex-nowrap shrink-0 right-0 top-1/2 -translate-y-1/2">{errors.password.message}</p>}
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