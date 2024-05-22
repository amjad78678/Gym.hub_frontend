import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import GymRoutes from "./GymRoutes";
import AdminRoutes from "./AdminRoutes";
import TrainerRoutes from "./TrainerRoutes";
import TrainerCallPage from "@/pages/trainer/TrainerCallPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/gym/*" element={<GymRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/trainer/*" element={<TrainerRoutes />} />
      <Route path="/call/:roomId" element={<TrainerCallPage/>} />

    </Routes>
  );
};

export default AppRouter;
