import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector as useSelector } from '../app/hooks'
import Spinner from '../components/Spinner'


function Dashboard() {
    const navigate = useNavigate()
    const { user, isLoading } = useSelector((state) => state.auth)


    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])
    if (isLoading) {
        return <Spinner />
    }

    return (
        <section className="heading">
            <h1> Welcome {user} </h1>
        </section>
    )
}

export default Dashboard
