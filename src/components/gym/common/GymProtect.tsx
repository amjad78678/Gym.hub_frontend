import React from 'react'
import { useSelector } from 'react-redux' 
import { Navigate, Outlet } from 'react-router-dom'


interface iType {
    auth: {
        gLoggedIn: boolean
    }
}
const GymProtect = () => {
    const {gLoggedIn}=useSelector((state: iType)=>state.auth)

    return (
     gLoggedIn?<Outlet/> : <Navigate to='/gym/gym-login' replace />
    )
}

export default GymProtect