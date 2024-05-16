import React, { useState } from "react";
import GymDetails from "@/components/user/gymDetails/GymDetails";
import { useParams } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import ReactDOM from "react-dom";
import OtpPage from "../common/OtpPage";
import Backdrop from "../common/Backdrop";
import CalenderDatePicker from "@/components/user/gymDetails/CalenderDatePicker";

const GymDetailsPage = () => {
  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <GymDetails />
      </div>
    </>
  );
};

export default GymDetailsPage;
