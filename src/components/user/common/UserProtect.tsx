import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


interface iType {
  auth: {
      uLoggedIn: boolean
  }
}
const UserProtect = () => {

const {uLoggedIn}=useSelector((state: iType)=>state.auth)

  return (
   uLoggedIn?<Outlet/> : <Navigate to='/login' replace />
  )
}

export default UserProtect