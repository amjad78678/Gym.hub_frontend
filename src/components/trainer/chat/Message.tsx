import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Message = ({ sender, text, selectedChat, createdAt }) => {
  const { trainerDetails } = useSelector((state: RootState) => state.auth);
  const isSenderYou = sender === trainerDetails.trainerId;
  const senderImage = isSenderYou
    ? trainerDetails.image
    : selectedChat?.profilePic.imageUrl;

  const messageClass = isSenderYou
    ? "bg-blue-600 text-white rounded-br-none"
    : "bg-gray-300 text-gray-600 rounded-bl-none";

  return (
    <>
      <div className="chat-message">
        <div className={`flex items-end ${isSenderYou ? "justify-end" : ""}`}>
          <img
            src={senderImage}
            alt="Profile"
            className={`w-6 h-6 rounded-full ${
              isSenderYou ? "order-2" : "order-1"
            }`}
          />
          <div
            className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1  ${
              isSenderYou ? "items-end" : "items-start"
            }`}
          >
            <div>
              <span
                className={`px-4 py-2 rounded-lg inline-block ${messageClass}`}
              >
                {text}
              </span>
              <div className="text-gray-400">
                <span>{format(createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
