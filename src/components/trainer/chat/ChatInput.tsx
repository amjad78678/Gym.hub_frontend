
import { useSocket } from "@/utils/context/socketContext";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";


const ChatInput = ({ selectedChat,handleSendMessage,newMessage,setNewMessage }) => {
  const socket: Socket = useSocket();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    socket.on("typedUser", () => setIsTyping(true));
    socket.on("stopTypedUser", () => setIsTyping(false));


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
        <div className="text-green-500">
         typing...
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
          className="bg-blue-500 text-white rounded-r-md p-2"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatInput;
