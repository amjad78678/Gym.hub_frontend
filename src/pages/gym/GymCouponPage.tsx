import { fetchCoupons } from '@/api/gym'
import GymNavbar from '@/components/gym/common/GymNavbar'
import AddCouponModal from '@/components/gym/gymCoupon/AddCouponModal'
import EditCouponModal from '@/components/gym/gymCoupon/EditCouponModal'
import GymCoupon from '@/components/gym/gymCoupon/GymCoupon'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const GymCouponPage = () => {

const [open,setOpen]=useState(false)
const [editOpen,setEditOpen]=useState(false)
const [selectedRow, setSelectedRow] = useState(null);
const {isLoading, data: couponsData,refetch } = useQuery({
  queryKey: ["coupons"],
  queryFn: fetchCoupons,
});

const [coupons, setCoupons] = useState([]);

useEffect(() => {
  if (couponsData) {
    setCoupons(couponsData.data.coupons);
  }
}, [couponsData]);

console.log('iam coupons',coupons);
console.log('selectedRow',selectedRow)



  return (
    <>
      <GymNavbar {...{fixed: false}}/>
    <div>
        <GymCoupon {...{open,setOpen,setSelectedRow,editOpen,setEditOpen,coupons,refetch,isLoading}} />
    </div>
   {open && <AddCouponModal {...{open,setOpen,refetch}}/>}
   {editOpen && <EditCouponModal {...{editOpen,selectedRow,setEditOpen,refetch}}/>}
   </>
  )
}

export default GymCouponPage