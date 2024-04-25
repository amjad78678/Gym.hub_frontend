
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LoginPage from '../pages/common/LoginPage'
import UserLoginPage from '../pages/user/UserLoginPage'
import UserRegisterPage from '../pages/user/UserRegisterPage'
import OtpPage from '@/pages/common/OtpPage'
import UserHome from '@/components/user/UserHome'

const UserRoutes = () => {
  return (
    <Routes>
       <Route path='' element={<UserHome/>} />
       <Route path='login' element={<LoginPage/>} />
       <Route path='user-login' element={<UserLoginPage/>} />
       <Route path='user-register' element={<UserRegisterPage/>}/>
       <Route path='test' element={<OtpPage userType='user' closeOtp={()=>{'amjad'}}/>} />
       


    </Routes>
  )
}

export default UserRoutes