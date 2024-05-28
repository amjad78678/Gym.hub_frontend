import { Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { useParams } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainerData, fetchUserChatMessages } from "@/api/user";
import { Socket } from "socket.io-client";
import { useSocket } from "@/utils/context/socketContext";
import iMessageType from "@/interfaces/iMessageType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { userChatCreate } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

const UserChat = () => {
  const { userId, trainerId } = useParams();
  const [socketConnected, setSocketConnected] = useState(false);
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const userName = userDetails?.name.replaceAll(" ", "");
  const [messages, setMessages] = useState<iMessageType[]>([]);
  const socket: Socket = useSocket();
  const [newMessage, setNewMessage] = useState("");

  const { isLoading, data: userChat,refetch } = useQuery({
    queryKey: ["userChatMessages", userId ?? null, trainerId ?? null],
    queryFn: fetchUserChatMessages,
  });

  const { isLoading: trainerDataLoading, data: trainerData } = useQuery({
    queryKey: ["userTrainerData", trainerId ?? null],
    queryFn: fetchTrainerData,
  });

  useEffect(() => {
    if (userChat) {
      setMessages(userChat.data.conversations);
    }
  }, [userChat]);


  useEffect(() => {
    if (socket) {
      const handleConnect = () => setSocketConnected(true);
      const handleMessage = (message) => {
        // Your message handling logic...
        // Prevent adding duplicate messages
        const existingIndex = messages.findIndex(
          (m) =>
            m.sender === message.sender &&
            m.receiver === message.receiver &&
            m.content === message.content
        );
        if (existingIndex === -1) {
          setMessages((prevMessages) => [
           ...prevMessages,
            {
              sender: message.sender,
              receiver: message.receiver,
              content: message.content,
            },
          ]);
        }
      };

      socket.on("connect", handleConnect);
      socket.on("message", handleMessage);

      // Emit join event when the component mounts
      socket.emit('add_user', userDetails.userId);

      // Cleanup function to remove event listeners and reset state
      return () => {
        socket.off("connect", handleConnect);
        socket.off("message", handleMessage);
      };
    }
  }, [socket, userDetails.userId]); 


  const { status, mutate: userChatCreateMutate } = useMutation({
    mutationFn: userChatCreate,
    onSuccess: (res) => {
      console.log("iam success", res.data);
    },
  });

  const handleSendMessage = () => {
    if (newMessage.trim()!== "") {

      socket.emit("stop_typing", { typeTo: trainerId });
      socket.emit("send_message", {
        sender: userId,
        receiver: trainerId,
        content: newMessage,
      });


      userChatCreateMutate({
        sender: userDetails.userId,
        receiver: trainerId,
        content: newMessage,
      })
       
        setNewMessage("");
  
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    !isLoading &&
    userChat &&
    !trainerDataLoading && (
      <Container>
        <div className="flex-1 p-2 bg-gray-200 sm:p-6 justify-between flex flex-col h-screen rounded-md">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <span
                  className={`absolute ${
                    socketConnected ? "text-green-500" : "text-red-500"
                  }  right-0 bottom-0`}
                >
                  <svg width="20" height="20">
                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                  </svg>
                </span>
                <img
                  src={trainerData?.data.trainer.image.imageUrl}
                  alt=""
                  className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="mr-3">{trainerData?.data.trainer.name}</span>
                </div>
                <span className="text-lg text-gray-600">
                  <CheckCircle color="success" />
                  Certified trainer
                </span>
              </div>
            </div>
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages.map((msg, index) => (
              <Message
                key={index}
                sender={msg.sender}
                text={msg.content}
                userId={userId}
                selectedTrainer={trainerData?.data.trainer}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <ChatInput
              {...{
                userId,
                trainerId,
                handleSendMessage,
                setNewMessage,
                newMessage,
              }}
            />
          </div>
        </div>
      </Container>
    )
  );
};

export default UserChat;
