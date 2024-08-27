import { useSocket } from "@/utils/context/socketContext";
import React, { CSSProperties, useEffect, useState } from "react";
import {
  AttachFile,
  Clear,
  EmojiEmotionsOutlined,
  Send,
} from "@mui/icons-material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Dropzone from "react-dropzone";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { fileUploadChat } from "@/api/user";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Formik, Field, Form } from "formik";
import { chatDropZoneValidation } from "@/validation/ChatDropZoneValidation";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const {userDetails}=useSelector((state:RootState)=>state.auth)
  
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
      socket.emit("sended_message", {
        typeTo: trainerId,
        name: userDetails.name,
        profilePic: userDetails.profilePic,
        message: newMessage,
      });
      handleSendMessage();
      setEmojiOpen(false);
      setImagePreviewUrls([]);
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
    let sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNewMessage(newMessage + emoji);
  };

  const [imagePreviewUrls, setImagePreviewUrls] = useState<any[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    if (file.length > 0) {
      const newImagePreviewUrls: any[] = [];
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
    marginLeft: "40px",
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

      {file.length > 0 && imagePreviewUrls.length > 0 ? (
        <>
          {file[mainImageIndex].type.startsWith("image/") ? (
            <div className="ms-8 w-64 p-2 border border-black shadow-lg rounded-lg">
              <img
                className="rounded-lg h-64 object-cover"
                src={imagePreviewUrls[mainImageIndex]}
                alt=""
              />
              <div className="flex  mt-2 mx-auto">
                {imagePreviewUrls.map((imageUrl, index) => (
                  <img
                    onClick={() => setMainImageIndex(index)}
                    className={`w-1/4  rounded-xl cursor-pointer ${
                      index === mainImageIndex
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    key={index}
                    src={imageUrl}
                    alt=""
                  />
                ))}
              </div>
            </div>
          ) : (
            <video
              className="rounded-lg ms-8  h-64 object-cover"
              controls
              src={imagePreviewUrls[mainImageIndex]}
            />
          )}
        </>
      ) : (
        imageSendLoading && (
          <div className="">
            <ClipLoader
              color={color}
              loading={true}
              cssOverride={override}
              size={50}
            />
          </div>
        )
      )}

      {isTyping && <div className="text-green-500">typing...</div>}
      <div className="flex items-center mx-auto space-x-2  ">
        <EmojiEmotionsOutlined
          onClick={() => setEmojiOpen(!emojiOpen)}
          className="cursor-pointer text-yellow-500"
        />
        <input
          type="text"
          value={newMessage}
          onChange={handleTypingInput}
          onKeyDown={handleKeyDown}
          placeholder={`${
            imageSendLoading ? "Sending files..." : "Type your message..."
          }`}
          className={`flex-grow text-black rounded-l-md border-2 p-2 ${
            imageSendLoading
              ? "bg-gray-100 placeholder:text-green-500 placeholder:font-bold"
              : "border-gray-300"
          }`}
          disabled={imageSendLoading}
        />
        <span> 
          <Formik
            initialValues={{ files: [] }}
            validationSchema={chatDropZoneValidation}
            onSubmit={(values) => {
              
              setFile(values.files);
            }}
            validate={(values) => {
              try {
                chatDropZoneValidation.validateSync(values, {
                  abortEarly: false,
                });
              } catch (err) {
                if (err instanceof Yup.ValidationError) {
                  toast.dismiss();
                  err.inner.forEach((e) => {
                    toast.error(e.message);
                  });
                }
              }
            }}
          >
            {({ setFieldValue, errors, touched, submitForm, resetForm }) => (
              <Form>
                <Field name="files">
                  {({ field }) => (
                    <Dropzone
                      accept={{
                        "image/*": [".jpeg", ".png", ".jpg", ".gif"],
                        "video/*": [".mp4", ".webm", ".mov"],
                      }}
                      onDrop={(acceptedFiles) => {
                        resetForm(); // Reset form state and errors
                        const newValue = [...acceptedFiles];
                        
                        setFieldValue("files", newValue, false); // false to avoid validation on change
                        setTimeout(() => {
                          submitForm();
                        }, 0);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            className={`${
                              imagePreviewUrls.length > 0 && "hidden"
                            }`}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <IconButton sx={{ backgroundColor: "" }}>
                              <AttachFile sx={{ color: "gray" }} />
                            </IconButton>
                          </div>
                          <div className="flex">
                            <div
                              className={`${
                                imagePreviewUrls.length === 0 && "hidden"
                              }`}
                            >
                              <IconButton
                                sx={{ backgroundColor: "" }}
                                onClick={() => {
                                  if (file.length > 0) {
                                    setFile([]);
                                    setMainImageIndex(0);
                                    setImagePreviewUrls([]);
                                  }
                                }}
                              >
                                <Clear sx={{ color: "gray" }} />
                              </IconButton>
                            </div>
                            <div
                              className={`${
                                imagePreviewUrls.length === 0 && "hidden"
                              }`}
                            >
                              <IconButton
                                sx={{ backgroundColor: "" }}
                                onClick={() => {
                                  handleSendMessage();
                                  setEmojiOpen(false);
                                  setImagePreviewUrls([]);
                                }}
                              >
                                <Send sx={{ color: "green" }} />
                              </IconButton>
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  )}
                </Field>
                <button type="submit" style={{ display: "none" }}>
                  Hidden Submit
                </button>
              </Form>
            )}
          </Formik>
        </span>
      </div>
    </>
  );
};

export default ChatInput;
