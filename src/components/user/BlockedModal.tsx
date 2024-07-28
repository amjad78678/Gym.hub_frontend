import React from "react";

const BlockedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 bg-opacity-75 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-8 border-4 border-black shadow-2xl rounded-2xl bg-white w-11/12 max-w-md">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-yellow-400 rounded-full p-5">
              <svg
                className="h-10 w-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-black mb-4 shadow-sm">
            Account Temporarily Paused
          </h3>
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-black leading-relaxed">
              Hey friend! 👋 We've had to hit pause on your account for now. Our
              AWS bills are skyrocketing faster than a SpaceX rocket! 🚀💸 We're
              keeping the site alive for job hunts and to impress potential
              employers. Sorry for any hiccups this causes! We'll be back in
              action as soon as we can.
            </p>
          </div>
          <div className="mt-8">
            <button
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-lg font-semibold rounded-full transform transition duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
              onClick={onClose}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedModal;
