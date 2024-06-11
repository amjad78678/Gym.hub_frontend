import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import LoadingSkeleton from "@/components/user/skeletons/LoadingSkeleton";
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
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
