import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch
} from '../app/hooks'
import { login, reset } from '../features/auth/authSlice'
import { UserCredentials } from '../types/User.types'
import Spinner from '../components/Spinner'

const Login = () => {
    const [formData, setFormData] = useState<UserCredentials>({
        username: '',
        password: '',
    })
    const { username, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/home')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e: React.FormEvent) => {
        setFormData((prevState: UserCredentials): UserCredentials => {
            const target = e.target as HTMLInputElement
            return ({
                ...prevState,
                [target.name]: target.value
            })
        })

    }

    const onLogin = (e: React.FormEvent): void => {
        e.preventDefault()
        const userData = { username, password }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
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
