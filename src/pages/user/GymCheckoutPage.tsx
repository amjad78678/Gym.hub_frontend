import { getCheckoutData } from '@/api/user'
import Navbar from '@/components/common/Navbar'
import Coupon from '@/components/user/checkout/Coupon'
import GymCheckout from '@/components/user/checkout/GymCheckout'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const GymCheckoutPage = () => {

  const [checkoutData,setCheckoutData]=useState({})
  const [couponData,setCouponData]=useState({})
  const [userWallet,setUserWallet]=useState(0)
  const [showCoupon,setShowCoupon] = useState(false)
  const {isLoading,data: checkout}=useQuery({
    queryKey:['checkoutData'],
    queryFn: getCheckoutData
  })

  useEffect(()=>{

  setCheckoutData(checkout?.data.message)
  setCouponData(checkout?.data.coupons)
  setUserWallet(checkout?.data.userWallet)


  },[checkout])

  console.log('couponData',couponData)
  const handleShowCoupon = ()=>{

    setShowCoupon(!showCoupon)
  }

  return !isLoading && checkout &&  (
    <>
    <Navbar/>
    <div className='bg-black text-white'>

        <GymCheckout {...{checkoutData,handleShowCoupon,userWallet}}/>
    </div>
    {showCoupon && couponData && <Coupon {...{handleShowCoupon,showCoupon,coupons:couponData}} />}
    </>
  )
}

export default GymCheckoutPage