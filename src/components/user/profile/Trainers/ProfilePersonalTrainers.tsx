import React, { useEffect, useState } from "react";
import TrainerCard from "./TrainerCard";
import { useQuery } from "@tanstack/react-query";
import { fetchBookedTrainers } from "@/api/user";
import Loader from "@/components/common/Loader";
import { Link } from "react-router-dom";
import NoTrainerComponent from "./NoTrainerComponent";
import dayjs from "dayjs";

const ProfilePersonalTrainers = ({ selected, setSelected }) => {
  useEffect(() => {
    setSelected(selected);
  }, []);

  const {
    isLoading,
    data: trainerData,
    error,
  } = useQuery({
    queryKey: ["profileTrainer"],
    queryFn: fetchBookedTrainers,
  });

  const validTrainers =
    trainerData?.data?.trainers.filter((trainer) => {
      return dayjs(trainer.expiryDate).diff(dayjs(), "day") >= 0;
    }) || [];

  if (isLoading) return <Loader />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return validTrainers.length ? (
    <div className="grid sm:grid-cols-12 gap-2">
      {trainerData?.data.trainers.map((trainer, index) => (
        <>
          <TrainerCard key={index} {...{ trainer }} />
        </>
      ))}
    </div>
  ) : (
    <NoTrainerComponent />
  );
};

export default ProfilePersonalTrainers;
