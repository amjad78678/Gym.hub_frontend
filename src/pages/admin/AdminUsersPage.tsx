import Users from '@/components/admin/users/Users'
import React, { useEffect } from 'react'

const AdminUsersPage = ({setSelectedLink,link}) => {
  useEffect(()=>{
    setSelectedLink(link)
  },[])
  return (
    <div ><Users/></div>
  )
}

export default AdminUsersPage