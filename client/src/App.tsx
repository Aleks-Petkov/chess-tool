import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );

}

export default App;
