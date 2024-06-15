import { bookTrainer } from "@/api/user";
import { RootState } from "@/redux/store";
import { Close } from "@mui/icons-material";
import { ClickAwayListener, Dialog, IconButton } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;

const SubscriptionModal = ({
  handleModal,
  modalOpen,
  trainer,
  setBookingTrainer,
}) => {
  console.log("setBookingTrainer", setBookingTrainer);

  const { mutate: bookTrainerMutate } = useMutation({
    mutationFn: bookTrainer,
    onSuccess: async (res) => {
      const stripe = await loadStripe(STRIPE_PK);
      if (res && res.data && stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.stripeId,
        });

        if (result.error) {
          const msg = result.error;
          console.log(msg);
        }
      }
    },
  });

  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const submitPlan = (plan: string) => {
    if (uLoggedIn) {
      const obj = {
        trainerId: trainer._id,
        bookingType: plan,
        bookingDate: dayjs(),
        expiryDate:
          plan == "Monthly" ? dayjs().add(1, "month") : dayjs().add(1, "year"),
        amount: plan == "Monthly" ? trainer.monthlyFee : trainer.yearlyFee,
      };
      bookTrainerMutate(obj);
      setBookingTrainer(null);
    } else {
      toast.error("Please login first before proceeding");
      navigate("/user-login");
    }

    handleModal();
  };

  const clickAwayHandler = () => {
    setBookingTrainer(null);
    handleModal();
  };

  if (!trainer) {
    return null;
  }

  return (
    <Dialog open={modalOpen} onClose={handleModal}>
      <div className="relative flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4 lg:gap-4">
        <span className="absolute top-0 right-0 p-2">
          <IconButton className="" onClick={clickAwayHandler}>
            <Close sx={{ color: "black" }} />
          </IconButton>
        </span>

        <div className=" w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Basic plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-4xl font-semibold">₹</span>
            <span className="text-4xl font-extrabold tracking-tight">
              {trainer.monthlyFee}
            </span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              /month
            </span>
          </div>
          <p className="text-gray-900 dark:text-white text-xs ml-2">
            Billed monthly
          </p>

          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Live video classes
              </span>
            </li>
            <li className="flex">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                24/7 chat support
              </span>
            </li>
          </ul>
          <button
            onClick={() => submitPlan("Monthly")}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Choose plan
          </button>
        </div>
        <div className="w-full max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Pro plan
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-4xl font-semibold">₹</span>
            <span className="text-4xl font-extrabold tracking-tight">
              {trainer.yearlyFee}
            </span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              /year
            </span>
          </div>
          <p className="text-gray-900 dark:text-white text-xs ml-2">
            Billed yearly
          </p>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                Live video classes
              </span>
            </li>
            <li className="flex">
              <svg
                className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                24/7 chat support
              </span>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => submitPlan("Yearly")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Choose plan
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default SubscriptionModal;
