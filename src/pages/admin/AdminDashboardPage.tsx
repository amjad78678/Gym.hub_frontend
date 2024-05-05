import Dashboard from '@/components/admin/dashboard/Dashboard'
import React, { useEffect } from 'react'

const AdminDashboardPage = ({setSelectedLink,link}) => {

  useEffect(()=>{
    setSelectedLink(link)
  },[])
  
  return (
    <div>
  
     <Dashboard/>


      
    </div>
  )
}

export default AdminDashboardPage