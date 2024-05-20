import Loader from "@/components/common/Loader";
import { Box, Container, FormControl, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { useParams } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainerData, fetchUserChatMessages } from "@/api/user";
import { Socket, io } from "socket.io-client";
import { useSocket } from "@/redux/context/socketContext";
import iMessageType from "@/interfaces/iMessageType";

const UserChat = () => {
  const { userId, trainerId } = useParams();
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState<iMessageType[]>([]);
  const socket: Socket = useSocket();

  const { isLoading, data: userChat } = useQuery({
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
    console.log("i am socket connecting");
    socket.on("connection", () => setSocketConnected(true));
    socket.emit("add_user", userId);
    socket.emit("chat_started", { to: trainerId });
  }, []);

  useEffect(()=>{

    socket.on("message",(message: iMessageType)=>{

      setMessages([...messages,message])

    })

  },[socket,messages])

  return (
    !isLoading &&
    userChat &&
    !trainerDataLoading && (
      <Container>
        <div className="flex-1 p-2 bg-gray-200 sm:p-6 justify-between flex flex-col h-screen rounded-md">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
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
            <div className="flex items-center space-x-2">{/* Buttons */}</div>
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
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <ChatInput {...{ userId, trainerId }} />
          </div>
        </div>
      </Container>
    )
  );
};

export default UserChat;
