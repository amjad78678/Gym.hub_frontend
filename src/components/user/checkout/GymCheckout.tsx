import { addNewSubscription, validateCoupon } from "@/api/user";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import CheckoutSkeleton from "../skeletons/CheckoutSkeleton";
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;

const GymCheckout = ({
  isLoading,
  checkoutData,
  handleShowCoupon,
  userWallet,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponDiscount,setCouponDiscount]=useState(0);
  const navigate = useNavigate();

  const { status, mutate: createSubscription } = useMutation({
    mutationFn: addNewSubscription,
    onSuccess: async (res) => {
      const stripe = await loadStripe(STRIPE_PK);
      if (res && res.data && stripe && paymentMethod === "online") {
        const result = await stripe.redirectToCheckout({
          sessionId: res.data.stripeId,
        });

        if (result.error) {
          const msg = result.error;
          
        }
      } else {
        if (res && res.data) {
          toast.success(res.data.message);
          navigate("/success");
        }
      }
    },
  });
  const submitHandler = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const subscriptionData = {
      gymId: checkoutData?.gymId?._id,
      date: checkoutData?.date,
      expiryDate: checkoutData?.expiryDate,
      subscriptionType: checkoutData?.subscriptionType,
      paymentType: paymentMethod,
      price: checkoutData.totalPrice,
      coupon: {
        name: coupon,
        isApplied: couponApplied,
      },
    };

    createSubscription(subscriptionData);
  };

  

  const { mutate: applyCouponMutate } = useMutation({
    mutationFn: validateCoupon,
    onSuccess: (res) => {
      if (res) {
        toast.success("Coupon Applied");
        setCouponApplied(true);
        setCoupon(res?.data?.coupon?.name);
        setCouponDiscount(res?.data?.coupon?.discount);
        checkoutData.totalPrice =
        checkoutData.totalPrice - res?.data?.coupon?.discount;
      }
    },
  });

  const handleCouponApply = () => {
    if (coupon.trim().length < 1) {
      toast.error("Enter coupon code");
      return;
    }

    const obj = {
      coupon: coupon,
      price: checkoutData?.totalPrice,
    };

    applyCouponMutate(obj);
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCoupon('');
    checkoutData.totalPrice =
    checkoutData.totalPrice + couponDiscount;
    setCouponDiscount(0);
    if (paymentMethod === "wallet") setPaymentMethod('');
};

  return isLoading && !checkoutData ? (
    <CheckoutSkeleton />
  ) : (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white pt-2 text-center">
        Confirm your subscription and pay
      </h1>
      <div className="w-full mt-10 flex justify-center">
        <div className="border rounded shadow p-3 sm:p-5 w-full max-w-4xl">
          <div>
            <div className="border-b border-b-gray-700 border-dotted mb-3 flex justify-between items-center py-2">
              <h1 className="sm:text-lg font-semibold">SUBSCRIPTION DETAILS</h1>
            </div>
            <div className="bg-gray-800 p-3">
              <h1 className="text-xl font-semibold tracking-wider mb-2">
                {checkoutData?.gymId?.gymName}
              </h1>
              <h1 className="mb-1">
                Time: {dayjs(checkoutData.createdAt).format("hh:mm A")}
              </h1>
              <h1>
                Date: {dayjs(checkoutData.createdAt).format("DD MMM YYYY")}
              </h1>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="sm:text-lg font-semibold border-b border-b-gray-700 border-dotted my-5">
              ORDER SUMMARY
            </h1>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="text-left py-2 px-4">ITEM</th>
                    <th className="py-2 px-4">AMOUNT</th>
                    <th className="py-2 px-4">JOINING DATE</th>
                    <th className="py-2 px-4">EXPIRY DATE</th>
                    <th className="text-right py-2 px-4">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800">
                    <td className="py-4 px-4">
                      <h1 className="text-lg">
                        {checkoutData.subscriptionType} Subscription
                      </h1>
                    </td>
                    <td className="align-top py-4 px-4 font-bold">
                      ₹{checkoutData.amount}
                    </td>
                    <td className="align-top py-4 px-4 font-bold">
                      {dayjs(checkoutData.date).format("DD MMM YYYY")}
                    </td>
                    <td className="align-top py-4 px-4 font-bold">
                      {dayjs(checkoutData.expiryDate).format("DD MMM YYYY")}
                    </td>
                    <td className="align-top text-right py-4 px-4 font-bold">
                      ₹{checkoutData.totalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="sm:text-lg font-semibold border-b border-b-gray-700 border-dotted my-5">
              PAYMENT
            </h1>
            <div className="mt-10 mb-5 flex flex-col items-center">
              <div className="flex justify-center items-center w-full">
                <div className="flex flex-1 lg:flex-none justify-center">
                  <input
                    id="coupon"
                    type="text"
                    className="border uppercase text-black pl-2 py-2 w-full sm:w-auto"
                    placeholder="Coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                </div>
                <div>
                  {couponApplied ? (
                    <button
                      className="bg-red-500 px-3 py-2.5 hover:bg-red-600 text-white"
                      onClick={handleRemoveCoupon}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-400 px-3 py-2.5 hover:bg-yellow-500 text-white"
                      onClick={handleCouponApply}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
              <div
                onClick={() => {}}
                className="cursor-pointer flex justify-start lg:justify-center mt-2 w-full"
              >
                <p
                  onClick={handleShowCoupon}
                  className="text-blue-500 font-semibold font-mono"
                >
                  find coupons
                </p>
              </div>
            </div>
            <div className="sm:flex gap-5 flex-wrap sm:gap-10 justify-center p-3">
              <label className="flex items-center text-lg">
                <input
                  type="radio"
                  name="paymentOption"
                  className="form-radio h-4 w-4 text-indigo-600"
                  onChange={() => setPaymentMethod("wallet")}
                />
                <span className="ml-2 text-gray-400">
                  Wallet ( Balance: ₹{userWallet} )
                </span>
              </label>
              <label className="flex items-center text-lg">
                <input
                  type="radio"
                  name="paymentOption"
                  className="form-radio h-4 w-4 text-indigo-600"
                  onChange={() => setPaymentMethod("online")}
                />
                <span className="ml-2 text-gray-400">Online</span>
              </label>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className="text-white w-full sm:w-64 px-4 py-2 rounded transition duration-300 bg-green-600 hover:bg-green-700"
                onClick={submitHandler}
              >
                <span>SUBMIT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymCheckout;
