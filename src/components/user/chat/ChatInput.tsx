import { useSocket } from "@/utils/context/socketContext";
import React, { CSSProperties, useEffect, useState } from "react";
import { AttachFile, EmojiEmotionsOutlined } from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Dropzone from "react-dropzone";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { fileUploadChat } from "@/api/user";
import { RingLoader } from "react-spinners";
import toast from "react-hot-toast";

const ChatInput = ({
  userId,
  trainerId,
  handleSendMessage,
  setNewMessage,
  newMessage,
  file,
  setFile,
  imageSendLoading,
}) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  useEffect(() => {
    socket.on("typedUser", () => setIsTyping(true));
    socket.on("stopTypedUser", () => setIsTyping(false));

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [socket]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleTypingInput = (e) => {
    setNewMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", { typeTo: trainerId });
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 2000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength) {
        socket.emit("stop_typing", { typeTo: trainerId });
        setTyping(false);
      }
    }, timerLength);
  };
  const handleAddEmoji = (e) => {
    setEmojiOpen(false);
    let sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNewMessage(newMessage + emoji);
  };

  const handleOnDrop = (acceptedFiles) => {
    if (acceptedFiles.length <= 4) {
      setFile(acceptedFiles);
    } else {
      toast.error("Maximum 4 files allowed");
      return;
    }
  };

  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    if (file.length > 0) {
      const newImagePreviewUrls = [];
      file.forEach((image) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImagePreviewUrls.push(reader.result);
          if (newImagePreviewUrls.length === file.length) {
            setImagePreviewUrls(newImagePreviewUrls);
          }
        };
        reader.readAsDataURL(image);
      });
    }
  }, [file]);

  const override: CSSProperties = {
    display: "flex",
    margin: "0 auto",
    borderColor: "green",
    marginTop: "30px",
    marginBottom: "30px",
  };
  let [color, setColor] = useState("#53C60C");
  return (
    <>
      {emojiOpen && (
        <div className="ml-8">
          <Picker
            data={data}
            onEmojiSelect={handleAddEmoji}
            maxFrequentRows={0}
          />
        </div>
      )}

      {file.length > 0 && (
        <div
          className={`relative ml-8 w-2/3  shadow-lg p-2  ${
            imagePreviewUrls.length !== file.length
              ? "bg-transparent"
              : "bg-gray-700 border-2 border-black"
          } `}
        >
          {imagePreviewUrls.length !== file.length ? (
            <RingLoader
              color={color}
              loading={true}
              cssOverride={override}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              <img
                className="rounded-lg h-64 w-full object-cover"
                src={imagePreviewUrls[mainImageIndex]}
                alt=""
              />
              <div className="bg-gray-700 flex gap-2 mt-2 mx-auto">
                {imagePreviewUrls.slice(1).map((imageUrl, index) => (
                  <img
                    onClick={() => setMainImageIndex(index)}
                    className="w-1/3 object-fill h-32 rounded-xl opacity-70 hover:opacity-100 cursor-pointer"
                    key={index}
                    src={imageUrl}
                    alt=""
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {isTyping && <div className="text-green-500">typing...</div>}
      <div className="flex items-center space-x-2">
        <EmojiEmotionsOutlined
          onClick={() => setEmojiOpen(!emojiOpen)}
          className="cursor-pointer text-yellow-500"
        />
        <input
          type="text"
          value={newMessage}
          onChange={handleTypingInput}
          onKeyDown={handleKeyDown}
          placeholder={`${imageSendLoading ? "Sending files..." : "Type your message..."}`}
          className={`flex-grow text-black rounded-l-md border-2 p-2 ${
            imageSendLoading ? "bg-gray-100" : "border-gray-300"
          }`}
          disabled={imageSendLoading}
        />
        <span>
          <Dropzone onDrop={handleOnDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input accept="image/*, video/*" {...getInputProps()} />
                  <IconButton sx={{ backgroundColor: "" }}>
                    <AttachFile />
                  </IconButton>
                </div>
              </section>
            )}
          </Dropzone>
        </span>
      </div>
    </>
  );
};

export default ChatInput;
