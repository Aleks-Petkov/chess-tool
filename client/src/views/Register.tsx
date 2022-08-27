import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { UserInfo } from '../types/User.types'

const Register = () => {
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

    const onRegister = (e: React.FormEvent): void => {
        e.preventDefault()
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onRegister}>
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
                        <input
                            type="password"
                            className='form-control'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            placeholder='Confirm password...'
                            onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Register
                        </button>
                    </div>
                </form>

            </section>
        </>
    )
}

export default Register
