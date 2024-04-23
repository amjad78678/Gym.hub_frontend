import GymLoginPage from '@/pages/gym/GymLoginPage'
import GymRegisterPage from '@/pages/gym/GymRegisterPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const GymRoutes = () => {
  return (
    <Routes>
     
     <Route path='gym-register' element={<GymRegisterPage />} />
     <Route path='gym-login' element={<GymLoginPage />}/>


     </Routes>
  )
}

export default GymRoutes