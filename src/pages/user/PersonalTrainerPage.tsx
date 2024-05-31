import PersonalTrainer from "@/components/user/personalTrainer/PersonalTrainer";
import Navbar from "@/components/common/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainers } from "@/api/user";
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
    queryKey: ["trainerPageTrainerList", page],
    queryFn: fetchTrainers,
  });
  console.log("iam trainerpage set", trainers);



  useEffect(() => {
    if (trainerData) {
      setTrainers((prevTrainers) => {
        const newTrainers = trainerData.data.trainers.filter((newTrainer) => {
          return !prevTrainers.some((existingTrainer) => existingTrainer._id === newTrainer._id);
        });
        return [...prevTrainers, ...newTrainers];
      });

    }
  }, [trainerData]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if(!trainerData && !trainers && trainers?.length < 1  ) return <GymListSkeleton/>
  return !isLoading && (
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
  ) 
};

export default PersonalTrainerPage;
