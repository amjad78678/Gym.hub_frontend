import React, { useEffect } from 'react'

const AdminBannerPage = ({setSelectedLink,link}) => {
    useEffect(()=>{
        setSelectedLink(link)
      },[])
  return (
    <div>
      {/* <AdminBanner/> */}
    </div>
  )
}

export default AdminBannerPage