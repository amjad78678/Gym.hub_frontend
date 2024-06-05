import { fetchTrainerData } from "@/api/trainer";
import TrainerEditProfile from "@/components/trainer/editProfile/TrainerEditProfile";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";



const TrainerProfilePage = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, [setSelectedLink, link]);

  const {
    isLoading,
    error,
    data: trainer,
    refetch
  } = useQuery({
    queryKey: ["fetchTrainerDataFromTrainerProfile"],
    queryFn: fetchTrainerData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('trinaer',trainer)

  return (
    <div>
      <TrainerEditProfile trainerData={trainer?.data?.trainer} refetch={refetch} />
    </div>
  );
};

export default TrainerProfilePage;
