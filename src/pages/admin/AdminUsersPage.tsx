import { fetchUsers } from '@/api/admin'
import Users from '@/components/admin/adminUsers/Users'
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
  return !isLoading && (
    <div >< Users {...{usersData,refetch}}/></div>
  )
}

export default AdminUsersPage