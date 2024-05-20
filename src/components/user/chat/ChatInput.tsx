import { userChatCreate } from '@/api/user';
import { useSocket } from '@/redux/context/socketContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const ChatInput = ({userId,trainerId}) => {
    const [newMessage, setNewMessage] = useState("");
    const socket = useSocket()
   
    const {status, mutate: userChatCreateMutate} = useMutation({
        mutationFn: userChatCreate,
        onSuccess: (res) => {

            console.log('iam success',res.data)
        },
    })

    const handleSendMessage = () => {
 
        const obj = {
            sender: userId,
            receiver: trainerId,
            content: newMessage
        }

      userChatCreateMutate(obj)
      socket.emit("send_message", obj);
      setNewMessage(""); 
    };


    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    };
    
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-grow text-black rounded-l-md border-2 border-gray-300 p-2"
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded-r-md p-2">
        Send
      </button>
    </div>
  )
}

export default ChatInput