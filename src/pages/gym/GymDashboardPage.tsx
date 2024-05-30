import React from 'react'
import GymDashboard from '@/components/gym/gymDashboard/GymDashboard'
import GymNavbar from '@/components/gym/common/GymNavbar'


const GymDashboardPage = () => {
  return (
    <div >
      <GymNavbar {...{fixed: true}}/>
      <GymDashboard/>
    </div>
  )
}

export default GymDashboardPage