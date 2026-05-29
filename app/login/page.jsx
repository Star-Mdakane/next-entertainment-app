import Link from "next/link";

const LoginPage = () => {
    return (
        <form>
            <h1>Login</h1>
            <div>
                <div>
                    Email
                </div>
                <div>
                    Password
                </div>
            </div>
            <div>
                <button type="submit">Login to your account</button>
                <p> Don't have an account? <Link href="/app/register">Sign Up</Link></p>
            </div>
        </form>
    )
}

export default LoginPage;