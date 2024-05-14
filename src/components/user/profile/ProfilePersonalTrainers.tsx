import React, { useEffect } from 'react'

const ProfilePersonalTrainers = ({selected,setSelected}) => {
    useEffect(()=>{
        setSelected(selected)
      },[])
  return (
    <div>ProfilePersonalTrainers</div>
  )
}

export default ProfilePersonalTrainers