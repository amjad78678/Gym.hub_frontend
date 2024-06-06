import { fetchTrainerData } from "@/api/trainer";
import Loader from "@/components/common/Loader";
import TrainerEditProfile from "@/components/trainer/editProfile/TrainerEditProfile";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const TrainerProfilePage = ({
  setSelectedLink,
  link,
  refetchTrainer,
  isLoading,
  data,
}) => {
  useEffect(() => {
    setSelectedLink(link);
  }, [setSelectedLink, link]);

  const { trainer } = data?.data || {};

  console.log('isLoading', isLoading);
  console.log('data', data);
  console.log('trainer', trainer);

  if (isLoading || !data) {
    return <Loader />;
  }

  return <TrainerEditProfile trainerData={trainer} refetch={refetchTrainer} />;
};

export default TrainerProfilePage;
