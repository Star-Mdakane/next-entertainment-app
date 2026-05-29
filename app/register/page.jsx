import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {
    return (
        <form>
            <h1>Sign Up</h1>
            <div>
                <div>
                    Email
                </div>
                <div>
                    Password
                </div>
                <div>
                    Repeat Password
                </div>
            </div>
            <div>
                <button type="submit">Login to your account</button>
                <p> Already have an account? <Link href="/app/login">Login</Link></p>
            </div>
        </form>
    )
}

export default SignUpPage