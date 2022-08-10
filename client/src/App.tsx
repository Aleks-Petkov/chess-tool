import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DashBoard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
// import axios
function App() {
  // const [backendData, setBackendData] = useState<User[] | null>(null)

  // useEffect(() => {
  //   fetch("/users")
  //   .then(res => res.json())
  //   .then(data => setBackendData(data))
  // }, [])

  return (
    <>
      <Router>
        <div>
          <Routes> 
            <Route path="/" element={<DashBoard/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />

          </Routes>
          <h1> Users !!!</h1>
          <ul>
            {/* {backendData?.map((user) => {
              return <li key={user.id}>{user.firstName} {user.lastName}</li>
            })} */}
          </ul>
        </div>
      </Router>
    </>
  );
  
}

export default App;
