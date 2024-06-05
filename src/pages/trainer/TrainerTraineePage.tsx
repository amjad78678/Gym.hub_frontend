import TrainerTrainee from "@/components/trainer/trainee/TrainerTrainee";
import React, { useEffect } from "react";

const TrainerTraineePage = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return (
    <div>
      <TrainerTrainee />
    </div>
  );
};

export default TrainerTraineePage;
