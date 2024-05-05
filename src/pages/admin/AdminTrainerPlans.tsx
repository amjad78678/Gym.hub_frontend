import React, { useEffect } from 'react'

const AdminTrainerPlans = ({setSelectedLink,link}) => {
    useEffect(()=>{
        setSelectedLink(link)
      },[])
  return (
    <div>AdminTrainerPlans</div>
  )
}

export default AdminTrainerPlans