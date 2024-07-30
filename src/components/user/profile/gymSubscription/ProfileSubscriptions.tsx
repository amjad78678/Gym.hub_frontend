import React, { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions } from "@/api/user";
import { Link } from "react-router-dom";
import NoSubscriptionComponent from "./NoSubscriptionComponent";
import dayjs from "dayjs";

const ProfileSubscriptions = ({ selected, setSelected }) => {
  useEffect(() => {
    setSelected(selected);
    refetch();
  }, []);

  const {
    isLoading,
    data: subscriptionData,
    refetch,
  } = useQuery({
    queryKey: ["subscriptionData"],
    queryFn: fetchSubscriptions,
  });

  const validSubscriptions =
    subscriptionData?.data.subscriptions.filter((sub) => {
      return dayjs(sub.expiryDate).diff(dayjs(), "day") >= 0;
    }) || [];

  return validSubscriptions.length ? (
    <>
      {validSubscriptions.map((sub) => (
        <SubscriptionCard key={sub.id} sub={sub} />
      ))}
    </>
  ) : (
    <NoSubscriptionComponent />
  );
};

export default ProfileSubscriptions;
