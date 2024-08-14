import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

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
            <motion.div
              className="p-6 h-[360px] overflow-y-auto text-white custom-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 p-3 rounded-lg inline-block mb-4"
              >
                Welcome to GymHub! How can I assist you today?
              </motion.p>
            </motion.div>
            <motion.div
              className="p-4 border-t border-gray-700"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-3 pr-12 rounded-full bg-gray-800 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300">
                  <FaPaperPlane size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
