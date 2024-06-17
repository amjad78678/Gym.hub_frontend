import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useEffect } from "react";

const ProfileWalletHistory = ({
  selected,
  setSelected,
  userData,
  handleCloseModalAddMoney,
  refetch,
}) => {
  useEffect(() => {
    setSelected(selected);
    refetch();
  }, []);

  
  if (userData.walletHistory.length) {
    
  }

  return userData.walletHistory.length ? (
    <div>
      <table className="text-left w-full">
        <thead className="bg-black flex text-white w-full">
          <tr className="flex w-full">
            <th className="p-3 text-center w-1/4">Date</th>
            <th className="p-3 text-center w-3/4">Details</th>
            <th className="p-3 text-center w-1/4">Type</th>
            <th className="p-3 text-center w-1/4">Amount</th>
          </tr>
        </thead>
        <tbody
          className="bg-grey-light flex flex-col items-center overflow-y-scroll w-full no-scrollbar"
          style={{ height: "50vh" }}
        >
          {userData.walletHistory.map((wallet) => (
            <tr key={wallet._id} className="flex w-full mb-4">
              <td className="p-3 w-1/4 text-center">
                {dayjs(wallet.createdAt).format("DD-MM-YYYY")}
              </td>
              <td className="p-3 w-3/4 text-center">{wallet.description}</td>
              <td className="p-3 w-1/4 text-center">{wallet.type}</td>
              {wallet.type === "Debit" ? (
                <td className="p-3 w-1/4 text-center text-red-500">
                  -{wallet.amount}
                </td>
              ) : (
                <td className="p-3 w-1/4 text-center text-green-500">
                  +{wallet.amount}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="border h-full border-gray-800 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-serif">No Wallet History Found</h1>
      <button
        onClick={handleCloseModalAddMoney}
        className="btn group flex items-center bg-transparent p-2 px-6 text-xl font-thin tracking-widest text-white"
      >
        <span className="relative pr-4 pb-1 text-white after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100">
          Add Money
        </span>
        <svg
          viewBox="0 0 46 16"
          height="10"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
          id="arrow-horizontal"
          className="-translate-x-2 fill-slate-700 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-x-105 group-hover:fill-white"
        >
          <path
            transform="translate(30)"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            id="Path_10"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ProfileWalletHistory;
