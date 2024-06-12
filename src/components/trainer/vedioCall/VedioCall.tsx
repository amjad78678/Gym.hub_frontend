import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";
const ZegoServerSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

const VideoCall = () => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const { senderId, recieverId } = useParams();
  const [uniqueId, setUniqueId] = useState("");
  const [userName, setUserName] = useState("");
  const myMeetingRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null); // Ref to store the ZegoCloud instance

  useLayoutEffect(() => {
    if (location.pathname.split("/").includes("trainer")) {
      console.log('inside trainer')
      setUserName(trainerDetails.name);
      setUniqueId(trainerDetails.trainerId);
    } else {
      console.log('inside user')
      setUserName(userDetails.name);
      setUniqueId(userDetails.userId);
    }
  }, []);

  useEffect(() => {
    const myMeeting = async (element: HTMLDivElement) => {
      const appID = 2143839818;
      const serverSecret = ZegoServerSecret;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        (senderId as string) + recieverId,
        uniqueId,
        userName
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
  }, [senderId, recieverId, userDetails?.name, uniqueId]);

  useEffect(() => {
    return () => {
      console.log("Simulating component unmounting");
      if (controllerRef.current) {
        controllerRef.current.destroy();
      }
    };
  }, []);

  return uniqueId ? (
    <div
      className=""
      style={{ width: "100vw", height: "100vh" }}
      ref={myMeetingRef}
    ></div>
  ) : null;
};

export default VideoCall;
