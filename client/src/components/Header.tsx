import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaChessPawn } from 'react-icons/fa'

const Header = () => {
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'> <FaChessPawn />Chess tool</Link>
			</div>
			<ul>
				<li>
					<Link to='/login'> <FaSignInAlt /> Login</Link>
				</li>
				<li>
					<Link to='/register'><FaUser /> Register</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
