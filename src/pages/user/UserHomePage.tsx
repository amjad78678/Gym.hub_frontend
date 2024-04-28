import Navbar from '@/components/common/Navbar'
import UserHome from '@/components/user/home/UserHome'
import React from 'react'

const UserHomePage = () => {
  return (
    <div className='bg-black'>
  
        <Navbar />

        <UserHome />

    </div>
  )
}

export default UserHomePage