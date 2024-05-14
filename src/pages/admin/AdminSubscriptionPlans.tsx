import AdminSubscriptions from '@/components/admin/adminSubscriptions/AdminSubscriptions'
import React, { useEffect } from 'react'

const AdminSubscriptionPlans = ({setSelectedLink,link}) => {
    useEffect(()=>{
        setSelectedLink(link)
      },[])
  return (
    <div>
      <AdminSubscriptions/>
    </div>
  )
}

export default AdminSubscriptionPlans