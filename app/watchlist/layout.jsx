import Header from "@/components/Header"
import HeaderL from "@/components/HeaderL"

const watchlistLayout = ({ children }) => {
    return (
        <div className="w-screen max-w-360 min-h-screen px-2 md-px-8 mx-auto flex flex-col lg:flex-row">
            <Header />
            <HeaderL />
            {children}
        </div>
    )
}

export default watchlistLayout;