import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { UserInfo } from '../types/User.types'

const Login = () => {
    const [formData, setFormData] = useState<UserInfo>({
        username: '',
        password: '',
        confirmPassword: '',
    })
    const { username, password, confirmPassword } = formData

    const onChange = (e: React.FormEvent) => {
        setFormData((prevState: UserInfo): UserInfo => {
            const target = e.target as HTMLInputElement
            return ({
                ...prevState,
                [target.name]: target.value
            })
        })

    }

    const onLogin = (e: React.FormEvent): void => {
        e.preventDefault()
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Log in
                </h1>
                <p>Log in and starting improving!</p>
            </section>
            <section className="form">
                <form onSubmit={onLogin}>
                    <div className="form-group">
                        <input
                            type="text"
                            className='form-control'
                            id='username'
                            name='username'
                            value={username}
                            placeholder='Enter your username...'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter your password...'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Log in
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
