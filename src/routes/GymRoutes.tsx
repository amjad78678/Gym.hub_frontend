import GymFooter from "@/components/gym/common/GymFooter";
import GymProtect from "@/components/gym/common/GymProtect";
import LoadingSkeleton from "@/components/user/skeletons/LoadingSkeleton";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const GymCouponPage = lazy(() => import("@/pages/gym/GymCouponPage"));
const GymDashboardPage = lazy(() => import("@/pages/gym/GymDashboardPage"));
const GymLoginPage = lazy(() => import("@/pages/gym/GymLoginPage"));
const GymMembersPage = lazy(() => import("@/pages/gym/GymMembersPage"));
const GymProfilePage = lazy(() => import("@/pages/gym/GymProfilePage"));
const GymRegisterPage = lazy(() => import("@/pages/gym/GymRegisterPage"));
const GymSubscriptionPage = lazy(
  () => import("@/pages/gym/GymSubscriptionPage")
);
const GymTrainersPage = lazy(() => import("@/pages/gym/GymTrainersPage"));
const GymPage = lazy(() => import("@/pages/gym/gymMain/GymPage"));

const GymRoutes = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route path="" element={<GymFooter />}>
          <Route path="gym-login" element={<GymLoginPage />} />
          <Route path="gym-register" element={<GymRegisterPage />} />
          <Route path="" element={<GymPage />}>
            <Route element={<GymProtect />}>
              <Route path="dashboard" element={<GymDashboardPage />} />
              <Route path="subscriptions" element={<GymSubscriptionPage />} />
              <Route path="members" element={<GymMembersPage />} />
              <Route path="trainers" element={<GymTrainersPage />} />
              <Route path="profile" element={<GymProfilePage />} />
              <Route path="coupons" element={<GymCouponPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default GymRoutes;
