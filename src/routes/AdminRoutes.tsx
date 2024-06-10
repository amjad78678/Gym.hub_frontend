import AdminProtect from "@/components/admin/common/AdminProtect";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "@/pages/admin/adminMain/AdminPage";

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
