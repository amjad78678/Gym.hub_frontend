import Loader from "@/components/common/Loader";
import { Box, Container, FormControl, IconButton, Input } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import ChatSideBar from "./ChatSideBar";
import { fetchTrainerChats, fetchUserData } from "@/api/trainer";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AddIcCall, CheckCircle, VideoCall } from "@mui/icons-material";
import iMessageType from "@/interfaces/iMessageType";
import { useSocket } from "@/utils/context/socketContext";
import { Socket } from "socket.io-client";
import { RootState } from "@/redux/store";

const TrainerChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const socket: Socket = useSocket();
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const trainerName = trainerDetails?.name.replaceAll(" ", "");
  
  const [messages, setMessages] = useState<iMessageType[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const { isLoading, data: messageData } = useQuery({
    queryKey: [
      "trainerMessages",
      trainerDetails.trainerId,
      selectedChat?.userId,
    ],
    queryFn: fetchTrainerChats,
    enabled: !!selectedChat,
  });

  const { isLoading: userDataLoading, data: userData } = useQuery({
    queryKey: ["trainerUserData", selectedChat?.userId],
    queryFn: fetchUserData,
    enabled: !!selectedChat,
  });

  useEffect(() => {
    if (messageData) {
      setMessages(messageData.data.conversations);
    }
  }, [messageData]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => setSocketConnected(true));
      socket.on("disconnect", () => setSocketConnected(false));
      socket.on("message", (message: iMessageType) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("message");
      }
    };
  }, [socket]);

  const handleJoinRoom = useCallback(() => {
    window.open(`/call/${trainerName}`, "_blank", "noopener,noreferrer");
  }, [trainerName]);

  return (
    <div className="grid sm:grid-cols-12">
      <div className="sm:col-span-3 mx-2">
        <ChatSideBar {...{ selectedChat, setSelectedChat }} />
      </div>

      {selectedChat && messageData && !isLoading && !userDataLoading && messages ? (
        <div className={`sm:col-span-9 ${selectedChat ? "block" : "hidden"}`}>
          <div className="flex-1 p-2 bg-gray-200 sm:p-6 justify-between flex flex-col h-screen rounded-md">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <span className={`absolute ${socketConnected ? 'text-green-500' : 'text-red-500'} right-0 bottom-0`}>
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src={userData?.data.user.profilePic}
                    alt="profileImg"
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="mr-3 text-black">
                      {userData?.data.user.username}
                    </span>
                  </div>
                  <span className="text-lg text-gray-600">
                    <CheckCircle color="success" />
                    Trusted user
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mr-4 mb-2">
                <IconButton onClick={handleJoinRoom}>
                  <VideoCall sx={{ width: 50, height: 50, color: "green" }} />
                </IconButton>
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
                  selectedChat={selectedChat}
                  {...{ setSocketConnected }}
                />
              ))}
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <ChatInput {...{ selectedChat }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:col-span-9 flex justify-center items-center">
          <h1 className="text-4xl">You have not selected any messages yet!</h1>
        </div>
      )}
    </div>
  );
};

export default TrainerChat;
