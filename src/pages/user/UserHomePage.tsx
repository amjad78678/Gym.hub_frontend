import Navbar from "@/components/common/Navbar";
import UserHome from "@/components/user/home/UserHome";
import { setNavPage } from "@/redux/slices/appSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const UserHomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavPage("home"));
  }, []);
  return (
    <div className="text-white">
      <Navbar {...{ fixed: true }} />
      <UserHome />
    </div>
  );
};

export default UserHomePage;
