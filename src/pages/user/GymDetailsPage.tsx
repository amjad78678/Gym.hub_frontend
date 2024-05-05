import React, { useState } from 'react'
import GymDetails from '@/components/user/gymDetails/GymDetails'
import { useParams } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import ReactDOM from "react-dom";
import OtpPage from "../common/OtpPage";
import Backdrop from "../common/Backdrop";
import CalenderDatePicker from '@/components/user/gymDetails/CalenderDatePicker';

const GymDetailsPage = () => {

  const [showCalender,setShowCalender]=useState(false)
  const handleShowCalender= ()=>{

    setShowCalender(!showCalender)
  }

  return (
    <>
    <div className='bg-black min-h-screen text-white'>
        <Navbar/>
        <GymDetails showCalender={handleShowCalender} />
    </div>

{showCalender && (
  <>
    {ReactDOM.createPortal(
      <Backdrop />,
      document.getElementById("backdrop-root") as HTMLElement
    )}

    {ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20">
       <CalenderDatePicker isOpen={showCalender} onToggle={handleShowCalender} />
      </div>,
      document.getElementById("root-modal") as HTMLElement
    )}
  </>
)}

</>
  )
}

export default GymDetailsPage