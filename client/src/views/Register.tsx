import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
    useProtectedPage
} from '../app/hooks'
import { register, reset } from '../features/auth/authSlice'
import { UserFormInfo } from '../types/User.types'
import Spinner from '../components/Spinner'

const Register = () => {
    useProtectedPage(false)
    const [formData, setFormData] = useState<UserFormInfo>({
        username: '',
        password: '',
        confirmPassword: '',
    })
    const { username, password, confirmPassword } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {status, error } = useSelector((state) => state.auth)

    useEffect(() => {
        if (status === 'failed') { // TODO: Perhaps fail is unnecessary state, use if(error)
            toast.error(error, { position: 'bottom-right' })
        }
        if (status === 'success') {
            toast.success(error, { position: 'bottom-right' })
        }
        dispatch(reset())

    }, [status, error, navigate, dispatch])

    const onChange = (e: React.FormEvent) => {
        setFormData((prevState: UserFormInfo): UserFormInfo => {
            const target = e.target as HTMLInputElement
            return ({
                ...prevState,
                [target.name]: target.value
            })
        })

    }

    const onRegister = (e: React.FormEvent): void => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match', { position: 'bottom-right' })
        } else {
            const userData = { username, password }
            dispatch(register(userData))
        }
    }

    if (status === 'pending') {
        return <Spinner />
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
