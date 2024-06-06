import { fetchTrainerData } from "@/api/trainer";
import Loader from "@/components/common/Loader";
import TrainerEditProfile from "@/components/trainer/editProfile/TrainerEditProfile";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";



const TrainerProfilePage = ({ setSelectedLink, link,refetchTrainer,trainer }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, [setSelectedLink, link]);

  console.log('trinaer',trainer)

  return !trainer ? (<Loader/>) : (
    <div>
      <TrainerEditProfile trainerData={trainer?.data?.trainer} refetch={refetchTrainer} />
    </div>
  );
};

export default TrainerProfilePage;
