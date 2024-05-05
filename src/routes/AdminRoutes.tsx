import AdminProtect from "@/components/admin/common/AdminProtect";
import Header from "@/components/admin/common/Header";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminGymPage from "@/pages/admin/AdminGymPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminPage from "@/pages/admin/adminMain/AdminPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLoginPage />} />
      <Route element={<AdminProtect />}>
        <Route path="dashboard/*" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
