import { RootState } from "@/redux/store";
import { useSocket } from "@/utils/context/socketContext";
import { showCustomToast } from "@/utils/miscillenious/showCustomToast";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const UserRouteWrapper = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const socket = useSocket();
  const isListenerAttached = useRef(false);

  const handleMessageReceived = useCallback(
    ({ name, profilePic, message }) => {
      showCustomToast(message, name, profilePic);
    },
    [socket]
  );

  useEffect(() => {
    if (!isListenerAttached.current) {
      socket.on("message_received", handleMessageReceived);
      isListenerAttached.current = true;
    }

    socket.emit("add_user", userDetails?.userId);

    return () => {
      socket.off("message_received", handleMessageReceived);
      isListenerAttached.current = false;
    };
  }, [socket, userDetails]);

  return <Outlet />;
};

export default UserRouteWrapper;
