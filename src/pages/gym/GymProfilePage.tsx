import { fetchGymData } from '@/api/gym'
import Loader from '@/components/common/Loader'
import GymNavbar from '@/components/gym/common/GymNavbar'
import GymProfile from '@/components/gym/gymProfile/GymProfile'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const GymProfilePage = () => {

  const {isLoading,data: myGymData} = useQuery({
    queryKey:['gymSideProfileData'],
    queryFn: fetchGymData
  })


  return isLoading ? <Loader/> : (
    <div className='text-white'>
      <GymNavbar {...{fixed: true}} />
      <GymProfile {...{gym: myGymData?.data.gymData}} />
    </div>
  )
}

export default GymProfilePage