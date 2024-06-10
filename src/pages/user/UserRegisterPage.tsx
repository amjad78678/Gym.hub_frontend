import React, { useState } from "react";
import UserRegister from "../../components/user/UserRegister";
import ReactDOM from "react-dom";
import OtpPage from "../common/OtpPage";
import Backdrop from "../common/Backdrop";
import Navbar from "@/components/common/Navbar";


const UserRegisterPage = () => {
  const [showOtp, setShowOtp] = useState(false);

  console.log("iam showOtp", showOtp);

  const otpHandler = () => {
    setShowOtp(!showOtp);
  };

  return (
    <>
        <Navbar {...{fixed: true}}/>

      <div className="relative z-0">
        <UserRegister setShowOtp={otpHandler} />
      </div>
      {showOtp && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root") as HTMLElement
          )}

          {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20">
              <OtpPage userType="user" closeOtp={otpHandler} showChangePassword={()=>{}}   />
            </div>,
            document.getElementById("root-modal") as HTMLElement
          )}
        </>
      )}
    </>
  );
};

export default UserRegisterPage;
