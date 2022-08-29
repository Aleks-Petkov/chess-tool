import { useEffect } from 'react'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch
} from '../app/hooks'
import { reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/dashboard')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <h1>Home screen for Chess tool!</h1>
        </div>
    )
}

export default Home
