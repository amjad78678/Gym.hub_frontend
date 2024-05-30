import { useSocket } from "@/utils/context/socketContext";
import React, { useEffect, useState } from "react";
import animationData from "../../../assets/animations/typing.json";
import { useLottie } from "lottie-react";

const ChatInput = ({ userId, trainerId, handleSendMessage, setNewMessage,newMessage }) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    console.log("typing.....", typing);
  }, [typing]);

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [socket]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    style: { width: 80, marginLeft: 0 },
  };

  const lottieObj = useLottie(defaultOptions);
  const { View } = lottieObj;

  return (
    <>
      {isTyping && <div>{View}</div>}
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
