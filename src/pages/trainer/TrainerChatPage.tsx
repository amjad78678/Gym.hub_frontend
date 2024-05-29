import TrainerChat from "@/components/trainer/chat/TrainerChat";
import { RootState } from "@/redux/store";
import { useSocket } from "@/utils/context/socketContext";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const TrainerChatPage = () => {
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const socket = useSocket();


  useEffect(() => {
    if (socket) {
      console.log("Emitting add_user for", trainerDetails.trainerId);
      socket.emit("add_user", trainerDetails.trainerId);
    }
  }, [socket, trainerDetails]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && socket ) {
        socket.emit("add_user", trainerDetails.trainerId);
        console.log(
          "Trainer is back to the chat page, re-emitting add_user event"
        );
      }  
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket, trainerDetails]);

  return (
    <div>
      <TrainerChat />
    </div>
  );
};

export default TrainerChatPage;
