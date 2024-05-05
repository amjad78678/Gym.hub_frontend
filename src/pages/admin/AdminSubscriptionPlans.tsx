import React, { useEffect } from 'react'

const AdminSubscriptionPlans = ({setSelectedLink,link}) => {
    useEffect(()=>{
        setSelectedLink(link)
      },[])
  return (
    <div>AdminSubscriptionPlans</div>
  )
}

export default AdminSubscriptionPlans