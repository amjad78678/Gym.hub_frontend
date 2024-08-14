import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PaymentSuccess from "@/components/user/payments/PaymentSuccess";
import PaymentFailure from "@/components/user/payments/PaymentFailure";
import UserProtect from "@/components/user/common/UserProtect";
import LoadingSkeleton from "@/components/user/skeletons/LoadingSkeleton";
import LoginPage from "@/pages/common/LoginPage";
import Chatbot from "@/components/common/Chatbot";

const VideoCallPage = lazy(() => import("@/pages/common/VideoCallPage"));
const UserLoginPage = lazy(() => import("../pages/user/UserLoginPage"));
const UserRegisterPage = lazy(() => import("../pages/user/UserRegisterPage"));
const UserHomePage = lazy(() => import("@/pages/user/UserHomePage"));
const GymListPage = lazy(() => import("@/pages/user/GymListPage"));
const GymDetailsPage = lazy(() => import("@/pages/user/GymDetailsPage"));
const GymCheckoutPage = lazy(() => import("@/pages/user/GymCheckoutPage"));
const UserProfilePage = lazy(() => import("@/pages/user/UserProfilePage"));
const PersonalTrainerPage = lazy(
  () => import("@/pages/user/PersonalTrainerPage")
);
const UserChatPage = lazy(() => import("@/pages/user/UserChatPage"));
const WorkoutsPage = lazy(() => import("@/pages/user/WorkoutsPage"));
const Footer = lazy(() => import("@/components/common/Footer"));

const UserRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route element={<Footer />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="user-login" element={<UserLoginPage />} />
            <Route path="user-register" element={<UserRegisterPage />} />
            <Route path="" element={<UserHomePage />} />
            <Route path="book-gym" element={<GymListPage />} />
            <Route path="gym-details" element={<GymDetailsPage />} />
            <Route
              path="personal-trainer/*"
              element={<PersonalTrainerPage />}
            />
            <Route path="workouts" element={<WorkoutsPage />} />
            <Route element={<UserProtect />}>
              <Route path="checkout" element={<GymCheckoutPage />} />
              <Route path="success/*" element={<PaymentSuccess />} />
              <Route path="cancel/*" element={<PaymentFailure />} />
              <Route path="profile/*" element={<UserProfilePage />} />
              <Route
                path="chat/:userId/:trainerId"
                element={<UserChatPage />}
              />
              <Route
                path="video_call/:trainerId/:userId"
                element={<VideoCallPage />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default UserRoutes;
