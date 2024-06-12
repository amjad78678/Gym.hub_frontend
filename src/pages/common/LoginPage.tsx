import React from "react";
import Navbar from "../../components/common/Navbar";
import ChooseLogin from "../../components/common/ChooseLogin";


const LoginPage = () => {
  return (
    <div className="bg-black">
      <Navbar {...{ fixed: true }}/>
      <ChooseLogin/>
    </div>

  );
};

export default LoginPage;
