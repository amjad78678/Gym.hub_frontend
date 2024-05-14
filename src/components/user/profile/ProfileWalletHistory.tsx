import React, { useEffect } from 'react'

const ProfileWalletHistory = ({selected,setSelected}) => {
    useEffect(()=>{
        setSelected(selected)
      },[])
  return (
    <div>ProfileWalletHistory</div>
  )
}

export default ProfileWalletHistory