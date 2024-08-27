import Navbar from "@/components/common/Navbar";
import UserChat from "@/components/user/chat/UserChat";
import { RootState } from "@/redux/store";
import { useSocket } from "@/utils/context/socketContext";
import { showCustomToast } from "@/utils/miscillenious/showCustomToast";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const UserChatPage = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const socket = useSocket();
  useEffect(() => {
    socket.emit("add_user", userDetails.userId);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && socket) {
        socket.emit("add_user", userDetails.userId);
        console.log(
          "User is back to the chat page, re-emitting add_user event"
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket, userDetails]);

  const handleClick = () => {
    showCustomToast("Enda mone kalikk");
  };

  return (
    <div className="bg-black ">
      <button className="bg-red-500" onClick={handleClick}>Some</button>
      <Navbar {...{ fixed: true }} />
      <UserChat />
    </div>
  );
};

export default UserChatPage;
