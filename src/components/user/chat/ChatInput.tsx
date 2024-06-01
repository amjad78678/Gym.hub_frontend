import { useSocket } from "@/utils/context/socketContext";
import React, { useEffect, useState } from "react";
import { EmojiEmotionsOutlined } from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ChatInput = ({ userId, trainerId, handleSendMessage, setNewMessage,newMessage }) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [emojiOpen,setEmojiOpen]= useState(false)


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
  const handleAddEmoji = (e) => {
    setEmojiOpen(false)
    let sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNewMessage(newMessage + emoji);
  };

  return (
    <>
      {emojiOpen && <div className="ml-8">
   <Picker data={data} onEmojiSelect={handleAddEmoji}  maxFrequentRows={0} />
 </div>
   }
      {isTyping && <div className="text-green-500">typing...</div>}
      <div className="flex items-center space-x-2">
      <EmojiEmotionsOutlined onClick={()=>setEmojiOpen(!emojiOpen)} className="cursor-pointer text-yellow-500" />
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
