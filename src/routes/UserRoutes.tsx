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
      </Route>

      <Route element={<UserProtect />}></Route>
    </Routes>
  );
};

export default UserRoutes;
