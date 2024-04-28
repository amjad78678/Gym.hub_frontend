import AdminLogin from "@/components/admin/Login/AdminLogin";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const { aLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (aLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [aLoggedIn]);

  return (
    <div>
      <AdminLogin />
    </div>
  );
};

export default AdminLoginPage;
