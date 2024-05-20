import React, { useEffect, useState } from "react";
import TrainerCard from "./TrainerCard";
import { useQuery } from "@tanstack/react-query";
import { fetchBookedTrainers } from "@/api/user";
import Loader from "@/components/common/Loader";

const ProfilePersonalTrainers = ({ selected, setSelected }) => {
  useEffect(() => {
    setSelected(selected);
  }, []);

  const { isLoading, data: trainerData,error } = useQuery({
    queryKey: ["profileTrainer"],
    queryFn: fetchBookedTrainers,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred: {error.message}</div>;


  return trainerData && (
    <div className="grid sm:grid-cols-12 gap-2">
      {trainerData?.data.trainers.map((trainer,index) => (
         <>
         {console.log('profile trainer each',trainer)}
        <TrainerCard key={index}  {...{ trainer }} />
        </>
      ))}
    </div>
  ) 
};

export default ProfilePersonalTrainers;
