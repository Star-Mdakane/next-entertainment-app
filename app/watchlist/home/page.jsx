import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Media from "@/components/Media";
import SearchBar from "@/components/SearchBar";
import Trending from "@/components/Trending";
import { MovieProvider } from "@/context/MovieContext"

export default async function HomePage() {
    const user = await getCurrentUser()
    if (!user) redirect('/login')

    return (
        <MovieProvider userId={user.id}>
            <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-6 md:mt-8 lg:mt-16 overflow-hidden">
                <SearchBar />
                <Trending />
                <Media userId={user.id} />
            </div>
        </MovieProvider>
    )
}