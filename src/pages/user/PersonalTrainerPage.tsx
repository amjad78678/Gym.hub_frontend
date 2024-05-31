import PersonalTrainer from "@/components/user/personalTrainer/PersonalTrainer";
import Navbar from "@/components/common/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainers } from "@/api/user";
import Loader from "@/components/common/Loader";
import { useEffect,useState } from "react";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";

const PersonalTrainerPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingTrainer, setBookingTrainer] = useState(null);
  const [page, setPage] = useState(1);
  const [trainers, setTrainers] = useState<any>([]);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleBookNow = (trainer) => {
    setBookingTrainer(trainer);
    handleModal();
  };

  const {
    isLoading,
    data: trainerData,
    isError,
  } = useQuery({
    queryKey: ["trainer", page],
    queryFn: fetchTrainers,
  });
  console.log("iam trainerpage set", trainers);

  useEffect(() => {
    if (trainerData) {
      setTrainers((prevTrainers) => [...prevTrainers, ...trainerData?.data.trainers]);
    }
  }, [trainerData]);

  useEffect(() => {
    setTrainers([]);
    setPage(1);
  },[])

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };




  return isLoading && trainers?.length===0 ? (
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
        }}
      />
    </div>
  );
};

export default PersonalTrainerPage;
