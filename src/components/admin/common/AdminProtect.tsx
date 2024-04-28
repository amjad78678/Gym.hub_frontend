import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtect = () => {
  const { aLoggedIn } = useSelector((state) => state.auth);
  return aLoggedIn ? (
    <section>{<Outlet />}</section>
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default AdminProtect;
