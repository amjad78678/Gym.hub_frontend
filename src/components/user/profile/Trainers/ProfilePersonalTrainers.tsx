import React, { useEffect } from 'react'
import TrainerCard from './TrainerCard'

const ProfilePersonalTrainers = ({selected,setSelected}) => {
    useEffect(()=>{
        setSelected(selected)
      },[])
  return (
    <div>
      <TrainerCard/>
      <TrainerCard/>
      <TrainerCard/>
      <TrainerCard/>
    </div>
  )
}

export default ProfilePersonalTrainers