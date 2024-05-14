import { fetchUserDetails } from '@/api/user'
import Navbar from '@/components/common/Navbar'
import ProfileMenu from '@/components/user/profile/ProfileMenu'
import ProfileTop from '@/components/user/profile/ProfileTop'
import UserProfile from '@/components/user/profile/UserProfile'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const UserProfilePage = () => {


  const {isLoading,data: userData,refetch}=useQuery({
    queryKey:['profile'],
    queryFn: fetchUserDetails,
  })
  const [userDetails,setUserDetails]=useState(null)
  useEffect(()=>{
   setUserDetails(userData?.data)
  },[userData])

  return !isLoading && (
   
       <div className='min-h-[750px] bg-black'>
       <Navbar/>
       <ProfileTop userData={userDetails} {...{refetch}}/>
       </div>
   
  )
}

export default UserProfilePage