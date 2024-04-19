import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import GymRoutes from "./GymRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/gym/*" element={<GymRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRouter;
