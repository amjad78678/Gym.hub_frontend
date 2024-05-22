import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/common/LoginPage";
import UserLoginPage from "../pages/user/UserLoginPage";
import UserRegisterPage from "../pages/user/UserRegisterPage";
import UserProtect from "@/components/user/common/UserProtect";
import UserHomePage from "@/pages/user/UserHomePage";
import GymListPage from "@/pages/user/GymListPage";
import GymDetailsPage from "@/pages/user/GymDetailsPage";
import Footer from "@/components/common/Footer";
import GymCheckoutPage from "@/pages/user/GymCheckoutPage";
import PaymentSuccess from "@/components/user/payments/PaymentSuccess";
import PaymentFailure from "@/components/user/payments/PaymentFailure";
import UserProfilePage from "@/pages/user/UserProfilePage";
import PersonalTrainerPage from "@/pages/user/PersonalTrainerPage";
import UserChatPage from "@/pages/user/UserChatPage";
import UserCallPage from "@/pages/trainer/TrainerCallPage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="user-login" element={<UserLoginPage />} />
      <Route path="user-register" element={<UserRegisterPage />} />
      <Route element={<Footer />}>
        <Route path="" element={<UserHomePage />} />
        <Route path="book-gym" element={<GymListPage />} />
        <Route path="gym-details" element={<GymDetailsPage />} />
        <Route path="checkout" element={<GymCheckoutPage/>} />
        <Route path="success/*" element={<PaymentSuccess/>} />
        <Route path="cancel/*" element={<PaymentFailure/>} />
        <Route path="profile/*" element={<UserProfilePage/>}/>
        <Route path="personal-trainer/*" element={<PersonalTrainerPage/>}/>
        <Route path="chat/:userId/:trainerId" element={<UserChatPage/>}/>
        <Route path="/call/:userRoomId" element={<UserCallPage/>}/>
        {/* <Route path="test" element={<Coupon/>} /> */}
      </Route> 
      <Route element={<UserProtect />}></Route>
    </Routes>
  );
};

export default UserRoutes;
