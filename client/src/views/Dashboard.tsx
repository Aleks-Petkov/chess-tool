import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector as useSelector } from '../app/hooks'

function Dashboard() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    console.log("hey", user?.user.username)

    

    useEffect(() => {
        if (!user) { // TODO: This condition succeeds on unsuccesful login as user = HTMLerror
            navigate('/')
        }
    }, [user, navigate])
    return (
        <section className="heading">
            <h1> Welcome {user?.user.username} </h1>
        </section>
    )
}

export default Dashboard
