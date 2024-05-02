import Navbar from '@/components/common/Navbar'
import GymList from '@/components/user/gymList/GymList'
import React from 'react'

const GymListPage = () => {
  return (
    <div className='bg-black'>
        
        <Navbar/>
        <GymList/>

        
    </div>
  )
}

export default GymListPage