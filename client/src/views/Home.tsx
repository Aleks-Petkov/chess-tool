import {
    useAppSelector as useSelector,
    useProtectedPage
} from '../app/hooks'
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
        </div>
    )
}

export default Home
