import React from 'react'
import GymDetails from '@/components/user/gymDetails/GymDetails'
import { useParams } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'

const GymDetailsPage = () => {

  return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar/>
        <GymDetails />
    </div>
  )
}

export default GymDetailsPage