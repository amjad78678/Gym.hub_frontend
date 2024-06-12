import TrainerProtect from "@/components/trainer/common/TrainerProtect";
import LoadingSkeleton from "@/components/user/skeletons/LoadingSkeleton";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const VideoCallPage = lazy(() => import("@/pages/common/VideoCallPage"));
const TrainerLoginPage = lazy(() => import("@/pages/trainer/TrainerLoginPage"));
const TrainerPage = lazy(() => import("@/pages/trainer/trainerMain/TrainerPage"));

const TrainerRoutes = () => {
  return (
    <Suspense fallback={<LoadingSkeleton/>}>
    <Routes>
      <Route path="" element={<TrainerLoginPage />} />
      <Route element={<TrainerProtect />}>
        <Route path="dashboard/*" element={<TrainerPage />} />
      </Route>
    </Routes>
    </Suspense>
  );
};

export default TrainerRoutes;
