import { fetchUserDetails } from "@/api/user";
import Navbar from "@/components/common/Navbar";
import ProfileTop from "@/components/user/profile/ProfileTop";
import ProfileSkeleton from "@/components/user/skeletons/ProfileSkeleton";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!uLoggedIn) {
      navigate("/login");
    }
  }, [uLoggedIn, navigate]);
  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserDetails,
  });

  return isLoading && !userData ? (
    <ProfileSkeleton />
  ) : (
    <div className="min-h-[800px] bg-black">
      <Navbar {...{ fixed: true }} />
      <ProfileTop userData={userData?.data} {...{ refetch }} />
    </div>
  );
};

export default UserProfilePage;
