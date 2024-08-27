import { RootState } from "@/redux/store";
import { useSocket } from "@/utils/context/socketContext";
import { showCustomToast } from "@/utils/miscillenious/showCustomToast";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface iType {
  auth: {
    tLoggedIn: boolean;
  };
}
const TrainerProtect = () => {
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const socket = useSocket();

  const handleMessageReceived = useCallback(({ name, profilePic, message }) => {
    console.log(name, profilePic);
    showCustomToast(message, name, profilePic);
  }, []);
  
  useEffect(() => {
    socket.on("message_received", handleMessageReceived);
    socket.emit("add_user", trainerDetails.trainerId);

    return () => {
      socket.off("message_received", handleMessageReceived);
    };
  }, [socket, trainerDetails]);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible" && socket ) {
  //       socket.emit("add_user", trainerDetails.trainerId);
  //       console.log(
  //         "Trainer is back to the chat page, re-emitting add_user event"
  //       );
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [socket, trainerDetails]);

  const { tLoggedIn } = useSelector((state: iType) => state.auth);
  return tLoggedIn ? <Outlet /> : <Navigate to="/trainer" replace />;
};

export default TrainerProtect;
