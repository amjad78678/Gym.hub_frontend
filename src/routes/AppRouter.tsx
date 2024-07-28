import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import LoadingSkeleton from "@/components/user/skeletons/LoadingSkeleton";
import TestPage from "@/pages/user/TestPage";
dayjs.extend(relativeTime);

const UserRoutes = lazy(() => import("./UserRoutes"));
const GymRoutes = lazy(() => import("./GymRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));
const TrainerRoutes = lazy(() => import("./TrainerRoutes"));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/gym/*" element={<GymRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/trainer/*" element={<TrainerRoutes />} />
        <Route path="/test/*" element={<TestPage {...{isOpen: true,onClose: false}}/>} />
        
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
