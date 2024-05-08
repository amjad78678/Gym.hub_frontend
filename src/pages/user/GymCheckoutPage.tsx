import { getCheckoutData } from '@/api/user'
import Navbar from '@/components/common/Navbar'
import GymCheckout from '@/components/user/checkout/GymCheckout'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const GymCheckoutPage = () => {

  const [checkoutData,setCheckoutData]=useState({})
  const {data: checkout}=useQuery({
    queryKey:['checkoutData'],
    queryFn: getCheckoutData
  })

  useEffect(()=>{

  setCheckoutData(checkout?.data.message)

  },[checkout])

  console.log(checkoutData)

  return (
    <>
    <Navbar/>
    <div className='bg-black text-white'>

        <GymCheckout {...{checkoutData}}/>
    </div>
    </>
  )
}

export default GymCheckoutPage