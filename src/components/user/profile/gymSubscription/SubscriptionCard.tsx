import dayjs from 'dayjs'
import React from 'react'

const SubscriptionCard = ({sub}) => {
    const cancelBtnHandler =()=>{
        console.log('helo')
    }
    const diffDays = dayjs(sub.expiryDate).diff(dayjs(sub.date), 'day');

  return (
        
<div className="md:flex border justify-between gap-5">
                <div className="flex-1 border-b sm:border-r sm:border-b-0 border-dotted border-gray-400">
                    <div className="px-5">
                        <div className="border-b py-2">
                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                <h1 className="font-bold text-gray-200 uppercase">{dayjs(sub.date).format('DD MMM YYYY')}</h1>
                                <h1 className="font-bold text-lg text-red-500 uppercase">{diffDays ==0 ? 'Today' : `${diffDays} days left`}</h1>
                                <h1 className="font-bold text-gray-200 uppercase">{dayjs(sub.expiryDate).format('DD MMM YYYY')}</h1>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <h1 className="text-xl flex-wrap sm:text-2xl font-bold text-center uppercase">{sub.subscriptionType} Subscription</h1>

                        </div>
                        <div className=" flex flex-col items-center">
                         
                            <div className="mt-1">
                                <h1 className='font-mono text-xl text-yellow-500'>{sub.gymId.gymName}</h1>
                                <h1 className="text-xl font-bold text-center mt-1">₹{sub.price}</h1>
                            </div>
                        </div>
                        <div className="mt-4 border-t">
                            <h1 className="text-center py-2 font-mono">@Copyright: Gym Hub</h1>
                        </div>
                    </div>
                </div>

                {/* qrSection */}
                <div className="p-5 sm:w-1/4 flex flex-col justify-center gap-2">
                    <div>
                        <h1 className="text-gray-600 text-sm text-center">MonthAndDay Year</h1>
                        <h1 className="text-gray-600 text-sm text-center">FormattedTime</h1>
                    </div>
                    <div className="flex justify-center">
                        <img src="ticketQrCode.jpg" alt="QR code" className="w-28 sm:w-52" />
                    </div>
                </div>
            </div>
       
  )
}

export default SubscriptionCard