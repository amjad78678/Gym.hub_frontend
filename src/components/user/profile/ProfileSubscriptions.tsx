import React, { useEffect, useState } from 'react';
import SubscriptionCard from './gymSubscription/SubscriptionCard';
import { useQuery } from '@tanstack/react-query';
import { fetchSubscriptions } from '@/api/user';


const ProfileSubscriptions = ({ selected, setSelected }) => {
  useEffect(() => {
    setSelected(selected);
  }, []);

  const [subs, setSubs] = useState([]);
  const { isLoading, data: subscriptionData, refetch } = useQuery({
    queryKey: ['subscriptionData'],
    queryFn: fetchSubscriptions,
  });

  useEffect(() => {
    setSubs(subscriptionData?.data.subscriptions);
  }, [subscriptionData]);

  return (
    <>
      {subs?.map((sub) => (
        <SubscriptionCard sub={sub} />
      ))}
    </>
  );
};


export default ProfileSubscriptions