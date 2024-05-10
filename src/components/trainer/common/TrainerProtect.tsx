import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface iType {
  auth: {
    tLoggedIn: boolean;
  };
}
const TrainerProtect = () => {
  const { tLoggedIn } = useSelector((state: iType) => state.auth);

  return tLoggedIn ? <Outlet /> : <Navigate to="/trainer" replace />;
};

export default TrainerProtect;
