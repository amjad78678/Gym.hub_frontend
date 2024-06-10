import TrainerProtect from "@/components/trainer/common/TrainerProtect";
import LoadingSkeleton from "@/components/user/skeletons/LoadingSkeleton";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const TrainerCallPage = lazy(() => import("@/pages/trainer/TrainerCallPage"));
const TrainerLoginPage = lazy(() => import("@/pages/trainer/TrainerLoginPage"));
const TrainerPage = lazy(() => import("@/pages/trainer/trainerMain/TrainerPage"));

const TrainerRoutes = () => {
  return (
    <Suspense fallback={<LoadingSkeleton/>}>
    <Routes>
      <Route path="" element={<TrainerLoginPage />} />
      <Route element={<TrainerProtect />}>
        <Route path="dashboard/*" element={<TrainerPage />} />
        <Route path='video_call/:trainerId/:userId' element={<TrainerCallPage/>} />
      </Route>
    </Routes>
    </Suspense>
  );
};

export default TrainerRoutes;
