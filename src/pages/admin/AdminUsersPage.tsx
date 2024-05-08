import Users from '@/components/admin/adminUsers/Users'
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