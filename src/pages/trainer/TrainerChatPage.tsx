import TrainerChat from "@/components/trainer/chat/TrainerChat";
import React, { useEffect } from "react";

const TrainerChatPage = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);

  return (
    <div>
      <TrainerChat />
    </div>
  );
};

export default TrainerChatPage;
