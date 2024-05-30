import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const VedioCall = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { senderId, recieverId } = useParams();
  const uniqueId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const myMeeting = async (element: HTMLDivElement) => {
    if (!element) {
      return;
    }

    const appID = 2143839818;
    const serverSecret = "f57beb8485bc7aa4e1da346693d118a0";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      senderId + recieverId,
      uniqueId,
      userDetails.name
    );

    const zegoCloud = ZegoUIKitPrebuilt.create(kitToken);
    zegoCloud.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };

  return (
    <div
      className=""
      style={{ width: "100vw", height: "100vh" }}
      ref={myMeeting}
    ></div>
  );
};

export default VedioCall;
