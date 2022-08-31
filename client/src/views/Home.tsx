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
    const { user, status, error } = useSelector((state) => state.auth)

    useEffect(() => {
        if (status === 'fail') { // TODO: Perhaps fail is unnecessary state, use if(error)
            toast.error(error, { position: 'bottom-right' })
        }
        if (status === 'success' || user) {
            navigate('/dashboard')
        }
        dispatch(reset())
    }, [user, status, error, navigate, dispatch])

    if (status === 'pending') {
        return <Spinner />
    }

    return (
        <div>
            <h1>Home screen for Chess tool!</h1>
        </div>
    )
}

export default Home
