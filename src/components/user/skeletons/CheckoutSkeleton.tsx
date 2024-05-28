import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckoutSkeleton = () => {
  return (
    <div>
      <h1 className="text-2xl bg-black sm:text-3xl font-bold text-gray-900 text-center">
        <Skeleton width={300} />
      </h1>
      <div className="w-full mt-10 flex justify-center">
        <div
          className="border rounded shadow p-3 sm:p-5"
          style={{ width: "60rem" }}
        >
          <div className="border-b border-b-gray-400 border-dotted mb-3 flex justify-between items-center py-2">
            <h1 className="sm:text-lg font-semibold">
              <Skeleton width={200} />
            </h1>
            <h1 className="sm:text-lg border py-2 px-4 w-fit text-rose-600">
              <Skeleton width={60} />
            </h1>
          </div>
          <div className=" p-3">
            <h1 className="text-xl font-semibold tracking-wider mb-2">
              <Skeleton width={400} />
            </h1>
            <h1 className="mb-1">
              <Skeleton width={200} />
            </h1>
            <h1>
              <Skeleton width={100} />
            </h1>
          </div>
          <div className="mt-10">
            <h1 className="sm:text-lg font-semibold border-b border-b-gray-400 border-dotted my-5">
              <Skeleton width={200} />
            </h1>
            <div className="">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="">
                    <th className="text-left py-2 px-4">
                      <Skeleton width={200} />
                    </th>
                    <th className="text-left py-2 px-4">
                      <Skeleton width={40} />
                    </th>
                    <th className="text-right py-2 px-4">
                      <Skeleton width={60} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="py-4 px-4">
                      <h1 className="text-lg">
                        <Skeleton width={300} />
                      </h1>
                    </td>
                    <td className="align-top py-4 px-6">
                      <Skeleton width={20} />
                    </td>
                    <td className="align-top text-right py-4 px-4 font-bold">
                      <Skeleton width={60} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="sm:text-lg font-semibold border-b border-b-gray-400 border-dotted my-5">
              <Skeleton width={200} />
            </h1>
            <div className="mt-10 mb-5 flex flex-col items-center">
              <div className="flex justify-center items-center"></div>
              <div className="cursor-pointer flex justify-start mt-2">
                <p className="text-blue-700 font-semibold">
                  <Skeleton width={80} />
                </p>
              </div>
            </div>
            <div className="sm:flex gap-5 flex-wrap sm:gap-10 justify-center p-3">
              <label className="flex items-center text-lg">
                <input
                  type="radio"
                  name="paymentOption"
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">
                  <Skeleton width={120} />
                </span>
              </label>
              <label className="flex items-center text-lg">
                <input
                  type="radio"
                  name="paymentOption"
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">
                  <Skeleton width={120} />
                </span>
              </label>
            </div>
            <div className="flex justify-center mt-3">
              <button className="text-white w-64 px-4 py-2 rounded transition duration-300 bg-green-600 hover:bg-green-700">
                <span>
                  <Skeleton width={100} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
