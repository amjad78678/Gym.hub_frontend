import React, { useEffect } from 'react'

const TrainerDashboardPage = ({setSelectedLink, link}) => {
  useEffect(()=>{setSelectedLink(link)},[])
  return (
    <div>TrainerDashboardPage</div>
  )
}

export default TrainerDashboardPage