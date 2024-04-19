
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LoginPage from '../pages/common/LoginPage'
import UserLoginPage from '../pages/user/UserLoginPage'
import GymLoginPage from '../pages/gym/GymLoginPage'

const UserRoutes = () => {
  return (
    <Routes>
     
       <Route path='login' element={<LoginPage/>} />
       <Route path='user-login' element={<UserLoginPage/>} />
       <Route path='gym-login' element={<GymLoginPage/>} />

    </Routes>
  )
}

export default UserRoutes