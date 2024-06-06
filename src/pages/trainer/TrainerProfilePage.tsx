import { fetchTrainerData } from "@/api/trainer";
import Loader from "@/components/common/Loader";
import TrainerEditProfile from "@/components/trainer/editProfile/TrainerEditProfile";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const TrainerProfilePage = ({ setSelectedLink, link, refetchTrainer }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, [setSelectedLink, link]);

  const { isLoading, data: trainerData } = useQuery({
    queryKey: ["trainerDataFetchInProfilePage"],
    queryFn: fetchTrainerData,
  });

  return isLoading || !trainerData ? (
    <Loader />
  ) : (
    <TrainerEditProfile
      trainerData={trainerData?.data.trainer}
      refetch={refetchTrainer}
    />
  );
};

export default TrainerProfilePage;
