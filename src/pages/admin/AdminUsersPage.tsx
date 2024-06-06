import { fetchUsers } from '@/api/admin'
import Users from '@/components/admin/adminUsers/Users'
import Loader from '@/components/common/Loader'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const AdminUsersPage = ({setSelectedLink,link}) => {
  useEffect(()=>{
    setSelectedLink(link)
  },[])
  const { isLoading, data: usersData,refetch } = useQuery({
    queryKey: ["usersData"],
    queryFn: fetchUsers,
  });
  return isLoading || !usersData ? <Loader /> : (
    <div >< Users {...{usersData,refetch,isLoading}}/></div>
  )
}

export default AdminUsersPage