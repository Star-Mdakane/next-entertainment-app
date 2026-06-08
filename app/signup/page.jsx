'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MdMovie } from 'react-icons/md'

const signupSchema = z.object({
    email: z.email().trim().min(1, "Can't be empty"),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
    password2: z.string().min(1, 'Confirm your password')
}).refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: ['password2']
})

const SignUpPage = () => {

    const [serverError, setServerError] = useState('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(signupSchema) })

    async function onSubmit(data) {
        setServerError('')

        const { password2, ...submitData } = data

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...submitData })
        })

        const result = await res.json()
        if (res.ok) {
            router.push('/login')
        } else {
            setServerError(result.error)
        }
    }



    return (
        <div className='flex flex-col mt-12 md:mt-20 items-center gap-14 md:gap-20'>
            <div>
                <Link href="/">
                    <MdMovie className="text-[32px] text-red-pri" />
                </Link>
            </div>
            <form
                className='card'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1
                    className='text-[32px] text-white font-light leading-[125%] tracking-[-0.5px]'>
                    Sign Up
                </h1>
                <div className='flex flex-col gap-6'>
                    <div className="relative flex justify-between items-center">
                        <input type="email" name="email" {...register('email')} placeholder="Email Address" className={`w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none ${errors.email ? 'focus:border-red-pri' : 'focus:border-white'} hover:border-white caret-red-pri border-b ${errors.email ? 'border-red-pri' : 'border-blue-ter'} p-3 cursor-pointer transition-all`} />
                        {errors.email && <p className="absolute text-red-pri text-sm mt-1 flex-nowrap shrink-0 right-0 top-1/2 -translate-y-1/2">{errors.email.message}</p>}
                    </div>
                    <div
                        className="relative flex justify-between items-center">
                        <input type="password" name="password" {...register('password')} placeholder="Password" className={`w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none ${errors.password ? 'focus:border-red-pri' : 'focus:border-white'} hover:border-white caret-red-pri border-b ${errors.password ? 'border-red-pri' : 'border-blue-ter'} p-3 cursor-pointer transition-all`} />
                        {errors.password && <p className="absolute text-red-pri text-sm mt-1 flex-nowrap shrink-0 right-0 top-1/2 -translate-y-1/2">{errors.password.message}</p>}
                    </div>
                    <div
                        className="relative flex justify-between items-center">
                        <input type="password" name="password2" {...register('password2')} placeholder="Repeat Password" className={`w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none ${errors.password2 ? 'focus:border-red-pri' : 'focus:border-white'} hover:border-white caret-red-pri border-b ${errors.password2 ? 'border-red-pri' : 'border-blue-ter'} p-3 cursor-pointer transition-all`} />
                        {errors.password2 && <p className="absolute text-red-pri text-sm mt-1 flex-nowrap shrink-0 right-0 top-1/2 -translate-y-1/2">{errors.password2.message}</p>}
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className='w-full rounded-md h-12 bg-red-pri text-white text-[15px] leading-[125%] tracking-normal font-light'>
                        {isSubmitting ? 'Creating account...' : 'Create an account'}
                    </button>
                    <p className='text-white text-[15px] text-center leading-[125%] tracking-normal font-light'> Already have an account? <Link className='text-red-pri' href="/login">Login</Link></p>
                </div>
            </form>
            {serverError && <p className="text-red-pri text-sm mt-1">{serverError}</p>}

        </div>
    )
}

export default SignUpPage