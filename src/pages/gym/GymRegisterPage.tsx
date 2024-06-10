import React, { useState } from 'react'
import GymRegister from '../../components/gym/gymSignup/GymRegister'
import ReactDOM from "react-dom";
import OtpPage from "../common/OtpPage";
import Backdrop from '../common/Backdrop';
import Navbar from '@/components/common/Navbar';



const GymRegisterPage = () => {

  const [showOtp, setShowOtp] = useState(false);
  const otpHandler = () => {
    setShowOtp(!showOtp);
  };
  return (
    <div className='bg-black'>
    <Navbar {...{fixed: false}}/>
    <div className='bg-black'>
        <GymRegister setShowOtp={otpHandler}/>
    </div>

{showOtp && (
  <>
    {ReactDOM.createPortal(
      <Backdrop />,
      document.getElementById("backdrop-root") as HTMLElement
    )}

    {ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20">
        <OtpPage userType="gym" closeOtp={otpHandler} showChangePassword={() => {}} />
      </div>,
      document.getElementById("root-modal") as HTMLElement
    )}
  </>
)}
</div>
  )
}

export default GymRegisterPage