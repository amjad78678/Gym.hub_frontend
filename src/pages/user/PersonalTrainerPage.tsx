import PersonalTrainer from "@/components/user/personalTrainer/PersonalTrainer";
import Navbar from "@/components/common/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainers } from "@/api/user";
import Loader from "@/components/common/Loader";
import { useState } from "react";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";

const PersonalTrainerPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingTrainer, setBookingTrainer] = useState(null);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleBookNow = (trainer) => {
    setBookingTrainer(trainer);
    handleModal();
  };

  const { isLoading, data: trainerData } = useQuery({
    queryKey: ["trainer"],
    queryFn: fetchTrainers,
  });

  return isLoading && !trainerData ? (
    <GymListSkeleton />
  ) : (
    <div className="bg-black text-white">
      <Navbar {...{ fixed: true }} />

      <PersonalTrainer
        {...{
          trainerData,
          handleBookNow,
          modalOpen,
          handleModal,
          bookingTrainer,
          setBookingTrainer,
        }}
      />
    </div>
  );
};

export default PersonalTrainerPage;
