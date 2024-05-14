import React, { useEffect } from 'react'

const ProfileEditProfile = ({selected,setSelected}) => {
    useEffect(()=>{
        setSelected(selected)
      },[])
  return (
    <div>ProfileEditProfile</div>
  )
}

export default ProfileEditProfile