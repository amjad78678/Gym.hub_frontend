import { IconButton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import ChatSideBar from "./ChatSideBar";
import {
  fetchTrainerChats,
  fetchUserData,
  trainerChatCreate,
} from "@/api/trainer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ArrowBack, CheckCircle, VideoCall, WhatsApp } from "@mui/icons-material";
import iMessageType from "@/interfaces/iMessageType";
import { useSocket } from "@/utils/context/socketContext";
import { RootState } from "@/redux/store";
import debounce from "@/utils/miscillenious/debounce";
import { useNavigate } from "react-router-dom";
import { fileUploadChat } from "@/api/user";

const TrainerChat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const socket = useSocket();
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const trainerName = trainerDetails?.name.replaceAll(" ", "");
  const [messages, setMessages] = useState<iMessageType[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [onlinedUsers, setOnlinedUsers] = useState([]);
  const [file, setFile] = useState<File[]>([]);
  const [imageSendLoading, setImageSendLoading] = useState(false);
  const navigate = useNavigate();

  const { isLoading, data: messageData } = useQuery({
    queryKey: [
      "trainerMessages",
      trainerDetails.trainerId,
      selectedChat?.userId,
    ],
    queryFn: fetchTrainerChats,
    enabled: !!selectedChat,
  });

  useEffect(() => {
    if (socket) {
      const debounceHandleMessage = (data: iMessageType) => {
        console.log("Received message:", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on("message", debounceHandleMessage);
      socket.on("onlined_users", (onlined_users) => {
        setOnlinedUsers(onlined_users);
      });

      return () => {
        socket.off("message", debounceHandleMessage);
      };
    }
  }, [socket, selectedChat]);

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

  const handleVedioCall = () => {
    socket.emit("call:start", {
      sender: trainerDetails.trainerId,
      receiver: selectedChat.userId,
    });
    navigate(
      `/trainer/video_call/${trainerDetails.trainerId}/${selectedChat.userId}`
    );
  };

  const { mutate: trainerChatCreateMutate } = useMutation({
    mutationFn: trainerChatCreate,
    onSuccess: (res) => {
      console.log("Message sent successfully", res.data);
    },
  });

  const { mutate: fileUploadMutate } = useMutation({
    mutationFn: fileUploadChat,
    onSuccess: (res) => {
      if (res) {
        console.log("iam success", res.data.messageData);

        if (res.data.type === "image") {
          res.data.messageData.map((file: any) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                sender: file.sender,
                receiver: file.receiver,
                content: file.content,
                createdAt: new Date(),
              },
            ]);

            setFile([]);

            socket.emit("send_message", {
              sender: file.sender,
              receiver: file.receiver,
              content: file.content,
              createdAt: new Date(),
            });
          });
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: res.data.messageData.sender,
              receiver: res.data.messageData.receiver,
              content: res.data.messageData.content,
            },
          ]);

          setFile([]);

          socket.emit("send_message", {
            sender: res.data.messageData.sender,
            receiver: res.data.messageData.receiver,
            content: res.data.messageData.content,
            createdAt: new Date(),
          });
        }

        setImageSendLoading(false);
      }
    },
  });

  const handleSendMessage = () => {
    if (file.length > 0) {
      setImageSendLoading(true);
      console.log("iam file length", file.length, file);
      const formData = new FormData();
      file.map((fil) => {
        formData.append("files", fil);
      });
      formData.append("sender", trainerDetails.trainerId);
      formData.append("receiver", selectedChat.userId);
      fileUploadMutate(formData);
    } else {
      if (newMessage.trim() !== "") {
        socket.emit("stop_typing", { typeTo: selectedChat.userId });
        const time = new Date();
        socket.emit("send_message", {
          sender: trainerDetails.trainerId,
          receiver: selectedChat.userId,
          content: newMessage,
          createdAt: time,
        });

        trainerChatCreateMutate({
          sender: trainerDetails.trainerId,
          receiver: selectedChat.userId,
          content: newMessage,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: trainerDetails.trainerId,
            receiver: selectedChat.userId,
            content: newMessage,
          },
        ]);

        setNewMessage("");
      }
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    const isUserOnline = onlinedUsers.find(
      (user) => user.userId === selectedChat?.userId
    );
    if (isUserOnline) {
      setSocketConnected(true);
    } else {
      setSocketConnected(false);
    }
  }, [messages, selectedChat]);

  return (
    <div className="grid sm:grid-cols-12">
      <div className="sm:col-span-3 mx-2">
        <ChatSideBar {...{ selectedChat, setSelectedChat }} />
      </div>

      {selectedChat &&
      messageData &&
      !isLoading &&
      !userDataLoading &&
      messages ? (
        <div className={`sm:col-span-9 ${selectedChat ? "block" : "hidden"}`}>
          <div className="flex-1 p-2 bg-gray-200 sm:p-6 justify-between flex flex-col h-[700px] rounded-md">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
               <span className="block lg:hidden" onClick={() => setSelectedChat(null)}><ArrowBack sx={{ cursor: "pointer",color:"black" }} /></span> 
                <div className="relative">
                  <span
                    className={`absolute ${
                      socketConnected ? "text-green-500" : "text-red-500"
                    } right-0 bottom-0`}
                  >
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src={userData?.data.user.profilePic.imageUrl}
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
                <IconButton onClick={handleVedioCall}>
                  <VideoCall sx={{ width: 50, height: 50, color: "black" }} />
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
                  createdAt={msg.createdAt}
                  selectedChat={selectedChat}
                  {...{ setSocketConnected }}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <ChatInput
                {...{
                  selectedChat,
                  handleSendMessage,
                  newMessage,
                  setNewMessage,
                  file,
                  setFile,
                  imageSendLoading,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex lg:col-span-9 justify-center items-center text-black bg-gray-300">
          <div className="flex flex-col">
            <WhatsApp sx={{ width: 150, height: 150, mx: "auto", mb: 2 }} />
            <h1 className="text-4xl">
              You have not selected any messages yet!
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerChat;
