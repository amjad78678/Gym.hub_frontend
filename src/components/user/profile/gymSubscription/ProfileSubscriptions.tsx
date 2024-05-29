import React, { useEffect, useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { useQuery } from '@tanstack/react-query';
import { fetchSubscriptions } from '@/api/user';
import { Link } from 'react-router-dom';


const ProfileSubscriptions = ({ selected, setSelected }) => {
  useEffect(() => {
    setSelected(selected);
    refetch();
  }, []);

  // const [subs, setSubs] = useState([]);
  const { isLoading, data: subscriptionData, refetch } = useQuery({
    queryKey: ['subscriptionData'],
    queryFn: fetchSubscriptions,
  });

  console.log("iam subscriptionData", subscriptionData);



  return !isLoading && subscriptionData?.data.subscriptions > 0 ? (
    <>
      {subscriptionData?.data?.subscriptions?.map((sub) => (
        <SubscriptionCard sub={sub} />
      ))}
    </>
  ):
  (
    <div className="border h-full border-gray-800 flex flex-col justify-center items-center">
    <h1 className="text-3xl font-serif">No Subscriptions Found</h1>
   <Link to={"/book-gym"}> <button className="btn group flex items-center bg-transparent p-2 px-6 text-xl font-thin tracking-widest text-white">
      <span className="relative pr-4 pb-1 text-white after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100">
        Book Gyms
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
    </button></Link>
  </div>
  )
};


export default ProfileSubscriptions