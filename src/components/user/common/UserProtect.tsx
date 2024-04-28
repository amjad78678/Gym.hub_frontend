import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserProtect = () => {

const {uLoggedIn}=useSelector((state)=>state.auth)

  return (
   uLoggedIn?<Outlet/> : <Navigate to='/login' replace />
  )
}

export default UserProtect