import React, { useEffect, useState } from 'react'
import PersonalTrainer from '@/components/user/personalTrainer/PersonalTrainer'
import Navbar from '@/components/common/Navbar'
import { useQuery } from '@tanstack/react-query'
import { fetchTrainers } from '@/api/user'

const PersonalTrainerPage = () => {
  const {status,data: trainerData}=useQuery({
    queryKey: ["trainer"],
    queryFn: fetchTrainers,
  })
  const [trainers,setTrainers]=useState(null)

  useEffect(()=>{

    setTrainers(trainerData?.data?.trainers)
  },[trainerData])

  console.log(trainers)

  return (
    <div className='bg-black text-white'>
        <Navbar/>
        <PersonalTrainer {...{trainers}}/>
    </div>
  )
}

export default PersonalTrainerPage