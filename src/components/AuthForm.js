import { authService } from 'firebase.config'
import React, { useState } from 'react'


const AuthForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState('')

    const handleChange = e => {
        const {
            target: { name, value },
        } = e
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let data;
            if (newAccount) {
                // create newAccount
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password)
            }
        }
        catch (error) {
            setError(error.message)
        }

    }

    const toggleAccount = () => setNewAccount((prev) => !prev)
    return (
        <>
            <form onSubmit={handleSubmit} className='container'>
                <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={handleChange}
                    className='authInput'
                />
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={handleChange}
                    className='authInput'
                />
                <input
                    type='submit'
                    value={newAccount ? 'Create Account' : 'Log In'}
                    className='authInput authSubmit'
                />
                <div>{error && <span className='authError'>{error}</span>}</div>
            </form>
            <span onClick={toggleAccount} className='authSwitch'>
                {newAccount ? 'Sign In' : 'Create Account'}
            </span>
        </>
    )
}

export default AuthForm
