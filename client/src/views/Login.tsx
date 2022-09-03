import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
    useProtectedPage
} from '../app/hooks'
import { login, reset } from '../features/auth/authSlice'
import { UserCredentials } from '../types/User.types'
import Spinner from '../components/Spinner'

const Login = () => {
    useProtectedPage(false)

    const [formData, setFormData] = useState<UserCredentials>({
        username: '',
        password: '',
    })
    const { username, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { status, error } = useSelector((state) => state.auth)

    useEffect(() => {
        if (status === 'failed') { // TODO: Perhaps failed is unnecessary state, use if(error)
            toast.error(error, { position: 'bottom-right' })
        }
        dispatch(reset()) // TODO: reset changes status in dep.list and is dispatched twice
    }, [status, error, navigate, dispatch])


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

    if (status === 'pending') {
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
