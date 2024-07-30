import dayjs from "dayjs";
import NoSubscriptionComponent from "./NoSubscriptionComponent";

const SubscriptionCard = ({ sub }) => {
  const diffDays = dayjs(sub.expiryDate).diff(dayjs(), "day");
  console.log("current date", dayjs());

  return (
    <div className="grid sm:grid-cols-12 border justify-between">
      <div className="sm:col-span-9 border-b sm:border-r sm:border-b-0 border-dotted border-gray-400">
        <div className="px-5">
          <div className="border-b py-2">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <h1 className="font-bold text-gray-200 uppercase">
                {dayjs(sub.date).format("DD MMM YYYY")}
              </h1>
              <h1 className="font-bold text-lg text-red-500 uppercase">
                {diffDays == 0 ? "Today" : `${diffDays} days left`}
              </h1>
              <h1 className="font-bold text-gray-200 uppercase">
                {dayjs(sub.expiryDate).format("DD MMM YYYY")}
              </h1>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <h1 className="text-xl flex-wrap sm:text-2xl font-bold text-center uppercase">
              {sub.subscriptionType} Subscription
            </h1>
          </div>
          <div className=" flex flex-col items-center">
            <div className="mt-1">
              <h1 className="font-mono text-xl text-yellow-500">
                {sub.gymId.gymName}
              </h1>
              <h1 className="text-xl font-bold text-center mt-1">
                ₹{sub.price}
              </h1>
            </div>
          </div>
          <div className="mt-4 border-t">
            <h1 className="text-center py-2 font-mono">@Copyright: Gym Hub</h1>
          </div>
        </div>
      </div>

      <div className="sm:col-span-3 flex justify-center items-center">
        <img src={sub.qrCode} alt="QR code" className="mx-auto p-2 h-full" />
      </div>
    </div>
  )
};

export default SubscriptionCard;
