import PersonalTrainer from "@/components/user/personalTrainer/PersonalTrainer";
import Navbar from "@/components/common/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainers } from "@/api/user";
import Loader from "@/components/common/Loader";
import { useEffect, useRef, useState, RefObject, useCallback } from "react";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";

const PersonalTrainerPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingTrainer, setBookingTrainer] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef: RefObject<HTMLElement> = useRef(null);
  const [trainer, setTrainer] = useState<any>([]);

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


  console.log('iam trainerpage set',trainer)

  useEffect(() => {
    if (!isLoading && !isError) {
      setLoading(false);
    }
  }, [isLoading, isError]);

  const handleInfiniteScroll = useCallback(async () => {
    if (!loading && scrollContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        scrollContainerRef.current;

      console.log("Scrolling", scrollTop, clientHeight, scrollHeight);
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        console.log("Reached bottom of div, load more");
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, scrollContainerRef]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener(
        "scroll",
        handleInfiniteScroll
      );
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          handleInfiniteScroll
        );
      }
    };
  }, [handleInfiniteScroll]);

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
          scrollContainerRef,
        }}
      />
    </div>
  );
};

export default PersonalTrainerPage;
