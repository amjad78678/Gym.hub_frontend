import React, { useEffect } from 'react'

const AdminBannerPage = ({setSelectedLink,link}) => {
    useEffect(()=>{
        setSelectedLink(link)
      },[])
  return (
    <div>AdminBannerPage</div>
  )
}

export default AdminBannerPage