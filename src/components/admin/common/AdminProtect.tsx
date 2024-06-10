import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtect = () => {
  const { aLoggedIn } = useSelector((state: RootState) => state.auth);
  return aLoggedIn ? (
    <section>{<Outlet />}</section>
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default AdminProtect;
