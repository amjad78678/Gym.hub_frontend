import Navbar from "@/components/common/Navbar";
import VideoCall from "@/components/trainer/vedioCall/VedioCall";
import React from "react";

const VideoCallPage = () => {
  return (
    <div>
      <Navbar {...{ fixed: true }} />
      <VideoCall />
    </div>
  );
};

export default VideoCallPage;
