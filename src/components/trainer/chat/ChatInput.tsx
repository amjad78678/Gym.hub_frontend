import { trainerChatCreate } from "@/api/trainer";
import { useSocket } from "@/redux/context/socketContext";
import { RootState } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../../../assets/animations/typing.json";

const ChatInput = ({ selectedChat }) => {
  const [newMessage, setNewMessage] = useState("");
  const socket: Socket = useSocket();
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { status, mutate: trainerChatCreateMutate } = useMutation({
    mutationFn: trainerChatCreate,
    onSuccess: (res) => {
      console.log("iam success", res.data);
    },
  });

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, []);
  console.log("selectedChat", selectedChat);
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("stop_typing", { typeTo: selectedChat.userId });
      const obj = {
        content: newMessage,
        receiver: selectedChat.userId,
        sender: trainerDetails.trainerId,
      };
      trainerChatCreateMutate(obj);
      socket.emit("send_message", obj);
      setNewMessage("");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", { typeTo: selectedChat.userId });
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 2000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop_typing", { typeTo: selectedChat.userId });
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {isTyping && (
        <div>
          <Lottie
            options={defaultOptions}
            width={80}
            style={{ marginLeft: 0 }}
          />
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow text-black rounded-l-md border-2 border-gray-300 p-2"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-r-md p-2"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatInput;
