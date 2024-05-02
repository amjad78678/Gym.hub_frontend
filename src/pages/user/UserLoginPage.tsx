import React, { useState } from 'react'
import UserLogin from '../../components/user/UserLogin'
import Navbar from '@/components/common/Navbar'
import ReactDOM from "react-dom";
import OtpPage from "../common/OtpPage";
import Backdrop from "../common/Backdrop";
import ForgotEmail from '../common/ForgotEmail';
import ChangePassword from '../common/ChangePassword';


const UserLoginPage = () => {


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

  console.log('iam show otp', showOtp)

  return (
    <>
    <div>
        <Navbar/>
        <UserLogin showForgotEmail={forgotEmailHandler} />
    </div>
      {showForgotEmail && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root") as HTMLElement
          )}

          {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
              <ForgotEmail user='user'  closeModal={forgotEmailHandler} otpShow={otpHandler} />
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
              <OtpPage userType="user-forgot-password" showChangePassword={changePasswordHandler} closeOtp={otpHandler} />
            </div>,
            document.getElementById("root-modal") as HTMLElement
          )}
        </>
      )}

      {showChangePassword && (
        <ChangePassword userType="user"  closeModal={changePasswordHandler}   />
      )}
      </>
  )
}

export default UserLoginPage