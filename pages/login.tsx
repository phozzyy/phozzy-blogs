'use Client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

export default function LoginPage() {
    {/* Login state */}
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    {/* Register state*/}
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerLoading, setRegisterLoading] = useState(false)
    const router = useRouter()

    {/* Login handler */}
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setLoading(false)

        if (error) {
            alert(error.message)
        } else {
            router.push('/new')
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setRegisterLoading(true)

        const { error } = await supabase.auth.signUp({
            email: registerEmail,
            password: registerPassword,
        })

        setRegisterLoading(false)

        if (error) {
            alert(error.message)
        } else {
            alert('Registration successful! Please check your email to confirm.')
        }
    }


    return (
        <div className='max-w-md mx-auto mt-10 p-6 border rounded shadow'>

            {/* Login Form */}
            <div className='p-6 border rounded shadow mb-6'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={handleLogin}>
                    <input 
                        type='email'
                        className="w-full mb-4 p-2 border"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                <input
                    type='password'
                    className="w-full mb-4 p-2 border"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   /> 
                <button
                    type='submit'
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>

       {/* Register Form */}
        <div className='p-6 border rounded shadow'>
            <h2 className='text-xl font-bold mb-4'>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type='email'
                    className="w-full mb-4 p-2 border"
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
                type='password'
                className="w-full mb-4 p-2 border"
                placeholder="Password"  
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
            />
            
            <button
                type='submit'
                className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
                disabled={registerLoading}
            >
                {registerLoading ? 'Registering...' : 'Register'}
            </button>
        </form>
    </div>
</div>
    )
}
    