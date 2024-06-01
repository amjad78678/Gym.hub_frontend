import { fetchALlMessages } from "@/api/trainer";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import iTrainerUsersChat from "@/interfaces/iTrainerUsersChat";

const ChatSideBar = ({ selectedChat, setSelectedChat }) => {
  const { isLoading, data: messagesData } = useQuery({
    queryKey: ["trainerMessages"],
    queryFn: fetchALlMessages,
  });

  const [usersList, setUsersList] = useState<iTrainerUsersChat[]>([]);
  useEffect(() => {
    if (messagesData) {
      const uniqueUsers = Array.from(
        new Set(
          messagesData?.data.messageData.map((msg) => msg?.sender?.username)
        )
      ).map((username) => ({
        username,
        profilePic: messagesData.data.messageData.find(
          (msg) => msg.sender.username === username
        ).sender.profilePic,
        userId: messagesData.data.messageData.find(
          (msg) => msg.sender.username === username
        ).sender._id,
      }));
      setUsersList(uniqueUsers);
    }
  }, [messagesData]);

  return (
    !isLoading &&
    messagesData &&
    usersList && (
      <div className={`${selectedChat ? "hidden" : "block"} sm:block`}>
        <Box
          sx={{
            flexDirection: "column",
            p: 2,
            backgroundColor: "grey.300",
            color: "black",
            borderRadius: 2,
            borderWidth: "1px",
            minHeight: "700px",
          }}
        >
          <Box
            sx={{
              pb: 2,
              fontFamily: "monospace",
              fontSize: 20,
            }}
          >
            <p className="mx-1 underline">My Chats</p>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f8f8f8",
              width: "100%",
              height: "100%",
              borderRadius: 2,
              overflowY: "hidden",
            }}
          >
            {messagesData ? (
              <Stack
                sx={{
                  overflowY: "auto",
                }}
              >
                {usersList.map((chat, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedChat(chat)}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                      display: "flex",
                      color: selectedChat === chat ? "white" : "black",
                      py: 1,
                      px: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Avatar src={chat.profilePic.imageUrl} />
                    <Typography sx={{ ml: 2, my: "auto" }} variant="body2">
                      {chat.username}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : (
              <p>No messages</p>
            )}
          </Box>
        </Box>
      </div>
    )
  );
};

export default ChatSideBar;
