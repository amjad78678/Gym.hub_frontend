import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { sendMessageToChatbot } from "@/api/user";
import { ClipLoader } from "react-spinners";

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputMessage, isUser: true },
      ]);
      setInputMessage("");
      setIsLoading(true);

      try {
        const response = await sendMessageToChatbot({ message: inputMessage });
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response?.data, isUser: false },
        ]);
      } catch (error) {
        console.error("Error sending message to chatbot:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, there was an error processing your request.",
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <motion.div
        className="hidden lg:block fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.button
          onClick={toggleChat}
          className="bg-yellow-400 text-black rounded-full p-4 shadow-lg"
          whileHover={{ boxShadow: "0 0 15px rgba(250, 204, 21, 0.7)" }}
        >
          <FaRobot size={28} />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed right-6 top-4 w-96 h-[95vh] bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-yellow-400"
          >
            <motion.div
              className="bg-yellow-400 text-black p-4 flex justify-between items-center"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold">GymHub Assistant</h3>
              <motion.button
                onClick={toggleChat}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={24} />
              </motion.button>
            </motion.div>
            <div className="flex flex-col justify-between h-[70vh] ">
              <motion.div
                ref={chatContainerRef}
                className="p-6 overflow-y-auto text-white no-scrollbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: message.isUser ? 20 : -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mb-4 p-3 rounded-lg inline-block ${
                      message.isUser
                        ? "bg-blue-600 text-white self-end"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#FACC15" size={40} />
                  </div>
                )}
              </motion.div>
              <motion.div
                className="absolute bottom-0 w-full p-4 border-t border-gray-700 "
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="w-full p-3 pr-12 rounded-full bg-gray-800 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300"
                    >
                      <FaPaperPlane size={20} />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
