import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import Chessboard from './components/Chessboard/Chessboard'
import Header from './components/Header'
import './index.css'

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/chessboard" element={<Chessboard />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );

}

export default App;
