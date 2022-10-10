import {
    useAppSelector as useSelector,
    useProtectedPage
} from '../app/hooks'
import { Link } from 'react-router-dom'

import Spinner from '../components/Spinner'


const Home = () => {
    useProtectedPage(false)
    const { status } = useSelector((state) => state.auth)

    if (status === 'pending') {
        return <Spinner />
    }

    return (
        <div>
            <h1>Home screen for Chess tool!</h1>
            <Link to="/chessboard">Play!</Link>
        </div>
    )
}

export default Home
