import AdminProtect from "@/components/admin/common/AdminProtect";
import Header from "@/components/admin/common/Header";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminGymPage from "@/pages/admin/AdminGymPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLoginPage />} />
      <Route element={<AdminProtect />}>
        <Route path="" element={<Header />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="gyms" element={<AdminGymPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
