import { fetchUserDetails } from '@/api/user'
import Navbar from '@/components/common/Navbar'
import ProfileTop from '@/components/user/profile/ProfileTop'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const UserProfilePage = () => {

  const [userDetails,setUserDetails]=useState(null)

  const {isLoading,data: userData,refetch}=useQuery({
    queryKey:['profile'],
    queryFn: fetchUserDetails,
  })
  useEffect(()=>{
   setUserDetails(userData?.data)
  },[userData])

  return !isLoading && userDetails && (
   
       <div className='min-h-[800px] bg-black'>
              <Navbar {...{fixed: true}}/>

       <ProfileTop userData={userDetails} {...{refetch}}/>
       </div>
   
  )
}

export default UserProfilePage