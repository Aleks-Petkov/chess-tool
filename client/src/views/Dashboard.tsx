import { useAppSelector as useSelector, useProtectedPage } from '../app/hooks'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'

function Dashboard() {
    useProtectedPage(true)
    const { user, status } = useSelector((state) => state.auth)

    if (status === 'pending') {
        return <Spinner />
    }

    return (
        <section className="heading">
            <h1> Welcome {user} </h1>
            <Link to="/chessboard">Play!</Link>
        </section>
    )
}

export default Dashboard
