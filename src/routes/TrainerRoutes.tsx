import TrainerProtect from "@/components/trainer/common/TrainerProtect";
import TrainerCallPage from "@/pages/trainer/TrainerCallPage";
import TrainerLoginPage from "@/pages/trainer/TrainerLoginPage";
import TrainerPage from "@/pages/trainer/trainerMain/TrainerPage";
import { Route, Routes } from "react-router-dom";
import React from "react";

const TrainerRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<TrainerLoginPage />} />
      <Route element={<TrainerProtect />}>
        <Route path="dashboard/*" element={<TrainerPage />} />
        <Route path='video_call/:trainerId/:userId' element={<TrainerCallPage/>} />
      </Route>
    </Routes>
  );
};

export default TrainerRoutes;
