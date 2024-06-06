import { useSocket } from "@/utils/context/socketContext";
import { AttachFile, EmojiEmotionsOutlined } from "@mui/icons-material";
import React, { CSSProperties, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Dropzone from "react-dropzone";
import { IconButton } from "@mui/material";
import { ClipLoader, RingLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Formik, Field, Form } from "formik";
import { chatDropZoneValidation } from "@/validation/ChatDropZoneValidation";
import * as Yup from "yup";

const ChatInput = ({
  selectedChat,
  handleSendMessage,
  newMessage,
  setNewMessage,
  file,
  setFile,
  imageSendLoading,
}) => {
  const socket: Socket = useSocket();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
      setEmojiOpen(false);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", { typeTo: selectedChat.userId });
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 2000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop_typing", { typeTo: selectedChat.userId });
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

  const [color, setColor] = useState("#53C60C");
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
          {file[mainImageIndex]?.type === "video/mp4" ? (
            <video
              className="rounded-lg ms-8 h-64 object-cover"
              controls
              src={imagePreviewUrls[mainImageIndex]}
            />
          ) : (
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
          )}
        </>
      ) : (
        imageSendLoading && (
          <div className="flex items-center justify-center w-full">
            <ClipLoader
              color={color}
              loading={true}
              cssOverride={override}
              size={150}
            />
          </div>
        )
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
          onChange={handleTyping}
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
              console.log("iam value file", values);
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
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <IconButton sx={{ backgroundColor: "" }}>
                              <AttachFile sx={{ color: "gray" }} />
                            </IconButton>
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
