import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaChessPawn } from 'react-icons/fa'
import {
	useAppSelector as useSelector,
	useAppDispatch as useDispatch
} from '../app/hooks'
import { logout } from '../features/auth/authSlice'

const Header = () => {
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.auth)

	const onLogout = () => {
		dispatch(logout())
	}
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'> <FaChessPawn />Chess tool</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className='btn' onClick={onLogout}>
							<FaSignOutAlt /> Log out
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login'> <FaSignInAlt /> Login</Link>
						</li>
						<li>
							<Link to='/register'><FaUser /> Register</Link>
						</li>
					</>)}

			</ul>
		</header>
	)
}

export default Header
