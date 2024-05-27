import Navbar from "@/components/common/Navbar";
import UserChat from "@/components/user/chat/UserChat";
import React from "react";

const UserChatPage = () => {
  return (
    <div className="bg-black ">
      <Navbar {...{ fixed: true }} />
      <UserChat />
    </div>
  );
};

export default UserChatPage;
