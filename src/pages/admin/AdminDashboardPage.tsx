import { recentlyAddedUsers } from '@/api/admin'
import Dashboard from '@/components/admin/adminDashboard/Dashboard'
import Loader from '@/components/common/Loader'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const AdminDashboardPage = ({setSelectedLink,link}) => {

  useEffect(()=>{
    setSelectedLink(link)
  },[])

  const {isLoading,data: recentlyUsers}=useQuery({
    queryKey:["recentlyAddedUsers"],
    queryFn: recentlyAddedUsers
  })
  
  return (isLoading || !recentlyUsers) ? (<Loader/>): (
    <div>
     <Dashboard {...{dashboard:recentlyUsers?.data}} />
    </div>
  )
}

export default AdminDashboardPage