import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
import Header from './components/Header'
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Header />
                    <App />
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/home" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    </React.StrictMode>
);
