import { trainerChatCreate } from "@/api/trainer";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatInput = ({ selectedChat }) => {
  const [newMessage, setNewMessage] = useState("");
  const {trainerDetails} = useSelector((state) => state.auth)
  const { status, mutate: trainerChatCreateMutate } = useMutation({
    mutationFn: trainerChatCreate,
    onSuccess: (res) => {
      console.log("iam success", res.data);
    },
  });
  console.log('selectedChat', selectedChat)
  const handleSendMessage = () => {
    console.log("Sending:", newMessage);
    const obj = {
      content: newMessage,
      receiver: selectedChat.userId,
      sender: trainerDetails.trainerId,
    };
    trainerChatCreateMutate(obj);
    setNewMessage("");
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
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
  );
};

export default ChatInput;
