import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const ZegoAppId = import.meta.env.VITE_ZEGO_APPID;
const ZegoServerSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

const VideoCall = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const { senderId, recieverId } = useParams();
  const uniqueId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const myMeetingRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null); // Ref to store the ZegoCloud instance

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement) => {
      if (!element) {
        return;
      }

      const appID = ZegoAppId;
      const serverSecret = ZegoServerSecret;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        (senderId as string) + recieverId,
        uniqueId,
        location.pathname.startsWith("/trainer")
          ? trainerDetails.name
          : userDetails.name
      );

      const zegoCloud = ZegoUIKitPrebuilt.create(kitToken);
      zegoCloud.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });

      // Store the ZegoCloud instance in the controllerRef
      controllerRef.current = zegoCloud;
    };

    if (myMeetingRef.current) {
      myMeeting(myMeetingRef.current);
    }
  }, [senderId, recieverId, userDetails.name, uniqueId]);

  useEffect(() => {
    return () => {
      console.log("Simulating component unmounting");
      if (controllerRef.current) {
        controllerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className=""
      style={{ width: "100vw", height: "100vh" }}
      ref={myMeetingRef}
    ></div>
  );
};

export default VideoCall;
