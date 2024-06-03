import PersonalTrainer from "@/components/user/personalTrainer/PersonalTrainer";
import Navbar from "@/components/common/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainers } from "@/api/user";
import { useEffect, useState } from "react";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";

const PersonalTrainerPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingTrainer, setBookingTrainer] = useState(null);
  const [page, setPage] = useState(1);
  const [trainers, setTrainers] = useState<any>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleBookNow = (trainer) => {
    setBookingTrainer(trainer);
    handleModal();
  };

  const {
    isFetching,
    data: trainerData,
    isError,
  } = useQuery({
    queryKey: ["trainerPageTrainerList", page],
    queryFn: fetchTrainers,
  });
  console.log("iam trainerpage set", trainers);

  useEffect(() => {
    if (trainerData) {
      setTrainers((prevTrainers) => {
        const newTrainers = trainerData.data.trainers.filter((newTrainer) => {
          return !prevTrainers.some(
            (existingTrainer) => existingTrainer._id === newTrainer._id
          );
        });
        return [...prevTrainers, ...newTrainers];
      });
    }
  }, [trainerData]);

  useEffect(() => {
    if (!isFetching && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isFetching, isLoadingMore]);

  const fetchMoreData = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  return isFetching && page == 1 ? (
    <GymListSkeleton />
  ) : (
    <div className="bg-black text-white">
      <Navbar {...{ fixed: true }} />
      <PersonalTrainer
        {...{
          trainerData: trainers,
          handleBookNow,
          modalOpen,
          handleModal,
          bookingTrainer,
          setBookingTrainer,
          fetchMoreData,
          fullResult: trainerData?.data?.fullResult,
          isLoadingMore,
        }}
      />
    </div>
  );
};

export default PersonalTrainerPage;
