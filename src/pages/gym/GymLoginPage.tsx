import React, { useState } from 'react'
import GymLogin from '../../components/gym/gymLogin/GymLogin'
import ReactDOM from "react-dom";
import OtpPage from "../common/OtpPage";
import Backdrop from "../common/Backdrop";
import ForgotEmail from '../common/ForgotEmail';
import ChangePassword from '../common/ChangePassword';
import Navbar from '@/components/common/Navbar';

const GymLoginPage = () => {
  
  const [showForgotEmail, setShowForgotEmail] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showChangePassword,setShowPassword]=useState(false)


  const otpHandler = () => {
    setShowOtp(!showOtp);
  };

  const changePasswordHandler = () => {
    setShowPassword(!showChangePassword);
  }

  const forgotEmailHandler = () => {
    
    setShowForgotEmail(!showForgotEmail);

  }

  return (
    <>
    <Navbar/>
    <div>
        <GymLogin showForgotEmail={forgotEmailHandler}/>
    </div>
    {showForgotEmail && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root") as HTMLElement
          )}
          {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
              <ForgotEmail user='gym'  closeModal={forgotEmailHandler} otpShow={otpHandler} />
            </div>,
            document.getElementById("root-modal") as HTMLElement
          )}


        </>
      )}

        {showOtp && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root") as HTMLElement
          )}

          {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20">
              <OtpPage userType="gym-forgot-password" showChangePassword={changePasswordHandler} closeOtp={otpHandler} />
            </div>,
            document.getElementById("root-modal") as HTMLElement
          )}
        </>
      )}

      {showChangePassword && (
        <ChangePassword userType="gym"  closeModal={changePasswordHandler}   />
      )}
    </>


  )
}

export default GymLoginPage