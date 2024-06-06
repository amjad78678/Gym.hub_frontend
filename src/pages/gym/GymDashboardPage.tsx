import React from 'react'
import GymDashboard from '@/components/gym/gymDashboard/GymDashboard'
import GymNavbar from '@/components/gym/common/GymNavbar'
import { useQuery } from '@tanstack/react-query'
import { fetchGymData } from '@/api/gym'
import Loader from '@/components/common/Loader'


const GymDashboardPage = () => {

  const { isLoading, data: myGymData } = useQuery({
    queryKey: ["gymSideDashboardData"],
    queryFn: fetchGymData,
  });

  return isLoading && !myGymData ? <Loader /> : (
    <div >
      <GymNavbar {...{fixed: true}}/>
      <GymDashboard {...{gym: myGymData?.data.gymData}} />
    </div>
  )
}

export default GymDashboardPage