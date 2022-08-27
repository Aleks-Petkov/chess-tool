import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
import Header from './components/Header'
import './index.css'
// import axios
function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </>
    );

}

export default App;
