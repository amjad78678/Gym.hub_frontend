import Navbar from "@/components/common/Navbar";
import UserChat from "@/components/user/chat/UserChat";
import { RootState } from "@/redux/store";
import { useSocket } from "@/utils/context/socketContext";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserChatPage = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const socket = useSocket();
  const { trainerId } = useParams();
  useEffect(() => {
    socket.emit("add_user", userDetails.userId);
    socket.emit("user_online", trainerId);

    return () => {
      socket.emit("user_offline", trainerId);
    };
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

  return (
    <div className="bg-black ">
      <Navbar {...{ fixed: true }} />
      <UserChat />
    </div>
  );
};

export default UserChatPage;
