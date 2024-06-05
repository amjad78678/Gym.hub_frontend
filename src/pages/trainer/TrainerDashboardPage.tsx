import { fetchDashboard } from '@/api/trainer'
import TrainerDashboard from '@/components/trainer/dashboard/TrainerDashboard'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const TrainerDashboardPage = ({setSelectedLink, link}) => {
  useEffect(()=>{setSelectedLink(link)},[])

  const {data: dashboardData}=useQuery({
    queryKey: ["trainerDashboard"],
    queryFn: fetchDashboard
})
  return (
    <div>
      <TrainerDashboard />
    </div>
  )
}

export default TrainerDashboardPage