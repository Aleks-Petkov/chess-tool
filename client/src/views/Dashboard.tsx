import { useAppSelector as useSelector, useProtectedPage } from '../app/hooks'
import Spinner from '../components/Spinner'

function Dashboard() {
    useProtectedPage(true)
    const { user, status } = useSelector((state) => state.auth)

    if (status === 'pending') {
        return <Spinner />
    }

    return (
        <section className="heading">
            <h1> Welcome {user} </h1>
        </section>
    )
}

export default Dashboard
