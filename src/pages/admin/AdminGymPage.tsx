import Gym from '@/components/admin/adminGym/Gym'
import React, { useEffect } from 'react'

const AdminGymPage = ({setSelectedLink,link}) => {
  useEffect(()=>{
    setSelectedLink(link)
  },[])
  return (
    <div className='bg-black'><Gym/></div>
  )
}

export default AdminGymPage