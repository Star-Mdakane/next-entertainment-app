import Link from "next/link";
import { MdMovie } from "react-icons/md";

const LoginPage = () => {
    return (
        <div className="flex flex-col mt-12 md:mt-20 items-center gap-14 md:gap-20">
            <div>
                <Link href="/">
                    <MdMovie className="text-[32px] text-red-pri" />
                </Link>
            </div>
            <form className="card">
                <h1
                    className='text-[32px] text-white font-light leading-[125%] tracking-[-0.5px]'>Login</h1>
                <div className="flex flex-col gap-6">
                    <label className="flex justify-between">
                        <input type="email" name="email" id="email" placeholder="Email Address" className="w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none focus:border-white hover:border-white caret-red-pri border-b border-blue-ter p-3 cursor-pointer transition-all" autoComplete="off" />
                        {/* <p>error</p> */}
                    </label>
                    <div
                        className="flex justify-between">
                        <input type="password" name="password" id="" placeholder="Password" className="w-full text-[15px] leading-[125%] tracking-normal font-light text-white focus:outline-none focus:border-white hover:border-white caret-red-pri border-b border-blue-ter p-3 cursor-pointer transition-all" />
                        {/* <p>error</p> */}
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <button type="submit" className='w-full rounded-md h-12 bg-red-pri text-white text-[15px] leading-[125%] tracking-normal font-light'>Login to your account</button>
                    <p className='text-white text-[15px] text-center leading-[125%] tracking-normal font-light'> Don&apos;t have an account? <Link className="text-red-pri" href="/signup">Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;