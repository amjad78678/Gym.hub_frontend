import React, { useEffect } from 'react'

const ProfileChangePassword = ({selected,setSelected}) => {

    useEffect(()=>{
        setSelected(selected)
      },[])
  return (
    <div>ProfileChangePassword</div>
  )
}

export default ProfileChangePassword