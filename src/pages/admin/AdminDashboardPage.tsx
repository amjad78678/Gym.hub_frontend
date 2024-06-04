import { recentlyAddedUsers } from '@/api/admin'
import Dashboard from '@/components/admin/adminDashboard/Dashboard'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const AdminDashboardPage = ({setSelectedLink,link}) => {

  useEffect(()=>{
    setSelectedLink(link)
  },[])

  const {data: recentlyUsers}=useQuery({
    queryKey:["recentlyAddedUsers"],
    queryFn: recentlyAddedUsers
  })
  
  return (
    <div>
  
     <Dashboard {...{dashboard:recentlyUsers?.data}} />


      
    </div>
  )
}

export default AdminDashboardPage