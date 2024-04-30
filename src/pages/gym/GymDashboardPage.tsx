import React from 'react'
import GymDashboard from '@/components/gym/gymDashboard/GymDashboard'
import Navbar from '@/components/gym/common/Navbar'


const GymDashboardPage = () => {
  return (
    <div className='bg-black min-h-screen'>
      <Navbar/>
     <GymDashboard/>
    </div>
  )
}

export default GymDashboardPage