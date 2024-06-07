import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import GymNavbar from "./GymNavbar";

interface iType {
  auth: {
    gLoggedIn: boolean;
  };
}
const GymProtect = () => {
  const { gLoggedIn } = useSelector((state: iType) => state.auth);

  return (
    <div className="bg-black min-h-screen">
      {gLoggedIn ? <Outlet /> : <Navigate to="/gym/gym-login" replace />}
    </div>
  );
};

export default GymProtect;
