
import TrainerProtect from "@/components/trainer/common/TrainerProtect";
import TrainerLoginPage from "@/pages/trainer/TrainerLoginPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<TrainerLoginPage />} />
      <Route element={<TrainerProtect />}>
        <Route path="dashboard/*" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
