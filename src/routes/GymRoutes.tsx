import Footer from "@/components/common/Footer";
import GymProtect from "@/components/gym/common/GymProtect";
import GymCouponPage from "@/pages/gym/GymCouponPage";
import GymDashboardPage from "@/pages/gym/GymDashboardPage";
import GymLoginPage from "@/pages/gym/GymLoginPage";
import GymMembersPage from "@/pages/gym/GymMembersPage";
import GymProfilePage from "@/pages/gym/GymProfilePage";
import GymRegisterPage from "@/pages/gym/GymRegisterPage";
import GymSubscriptionPage from "@/pages/gym/GymSubscriptionPage";
import GymTrainersPage from "@/pages/gym/GymTrainersPage";
import GymPage from "@/pages/gym/gymMain/GymPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const GymRoutes = () => {
  return (
    <Routes>
      <Route path="gym-register" element={<GymRegisterPage />} />
      <Route path="gym-login" element={<GymLoginPage />} />
      <Route path="" element={<GymPage />}>
        <Route element={<GymProtect />}>
          <Route element={<Footer />}>
            <Route path="dashboard" element={<GymDashboardPage />} />
            <Route path="subscriptions" element={<GymSubscriptionPage />} />
            <Route path="members" element={<GymMembersPage />} />
            <Route path="trainers" element={<GymTrainersPage />} />
            <Route path="profile" element={<GymProfilePage />} />
            <Route path="coupons" element={<GymCouponPage/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default GymRoutes;
