import { userChatCreate } from "@/api/user";
import { useSocket } from "@/redux/context/socketContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import animationData from "../../../assets/animations/typing.json";
import Lottie from "react-lottie";

const ChatInput = ({ userId, trainerId }) => {
  const [newMessage, setNewMessage] = useState("");
  const socket: Socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);

  const { status, mutate: userChatCreateMutate } = useMutation({
    mutationFn: userChatCreate,
    onSuccess: (res) => {
      console.log("iam success", res.data);
    },
  });

  useEffect(() => {
    console.log("typing.....", typing);
  }, [typing]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("stop_typing", { typeTo: trainerId });
      const obj = {
        sender: userId,
        receiver: trainerId,
        content: newMessage,
      };

      userChatCreateMutate(obj);
      socket.emit("send_message", obj);
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
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

  const handleTypingInput = (e) => {
    setNewMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", { typeTo: trainerId });
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 2000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength) {
        socket.emit("stop_typing", { typeTo: trainerId });
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
          onChange={handleTypingInput}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow text-black rounded-l-md border-2 w-full border-gray-300 p-2"
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
