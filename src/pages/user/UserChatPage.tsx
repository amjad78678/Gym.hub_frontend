import Navbar from "@/components/common/Navbar";
import UserChat from "@/components/user/chat/UserChat";
import { RootState } from "@/redux/store";
import { useSocket } from "@/utils/context/socketContext";
import { showCustomToast } from "@/utils/miscillenious/showCustomToast";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserChatPage = () => {





  return (
    <div className="bg-black ">

      <Navbar {...{ fixed: true }} />
      <UserChat />
    </div>
  );
};

export default UserChatPage;
