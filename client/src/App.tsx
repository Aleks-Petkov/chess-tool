import { useEffect } from 'react'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch
} from './app/hooks'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
import Header from './components/Header'
import { ToastContainer, toast } from 'react-toastify'
import { reset } from './features/auth/authSlice'
import Spinner from './components/Spinner'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)



    return (
        <>
            <div className="container">
            </div>
            <ToastContainer />
        </>
    );

}

export default App;
