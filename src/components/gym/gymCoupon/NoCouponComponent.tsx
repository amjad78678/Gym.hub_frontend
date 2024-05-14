import React from 'react';


const NoCouponComponent = ({setOpen}) => {



  return (

<div className="flex flex-col items-center justify-center h-screen bg-black text-white">

  <p className="text-3xl font-bold text-gray-300 mb-8">No Coupons Available</p>
  <p className="text-lg mb-8">It seems like there is no coupons added to your gym. You can add a new coupon to get started.</p>
  

  <button onClick={() => setOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
    Add Coupons
  </button>
</div>
  );
};

export default NoCouponComponent;