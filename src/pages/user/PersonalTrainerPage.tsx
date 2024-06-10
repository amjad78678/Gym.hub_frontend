import PersonalTrainer from "@/components/user/personalTrainer/PersonalTrainer";
import Navbar from "@/components/common/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchMaxPriceTrainer, fetchTrainers } from "@/api/user";
import { useCallback, useEffect, useState } from "react";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";
import debounce from "@/utils/miscillenious/debounce";

const PersonalTrainerPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingTrainer, setBookingTrainer] = useState(null);
  const [page, setPage] = useState(1);
  const [allTrainers, setAllTrainers] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [sliderValue, setSliderValue] = useState(0);
  const [experience,setExperience]=useState('All');
  const { data: maxPriceData } = useQuery({
    queryKey: ["maxPriceInPersonalTrainerPage"],
    queryFn: fetchMaxPriceTrainer,
  });

  useEffect(() => {
    if (maxPriceData) {
      setSliderValue(maxPriceData.data.maxPrice[0].maxPrice);
    }
  }, [maxPriceData]);

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
    refetch: refetchImmediately,
  } = useQuery({
    queryKey: ["trainerPageTrainerList", page],
    queryFn: () => {
      return fetchTrainers({
        page: page,
        search: search,
        sliderValue: sliderValue,
        experience: experience
      });
    },
    enabled: sliderValue > 0,
  });

  useEffect(() => {
    if (trainerData) {
      setAllTrainers((prevTrainers) => {
        const trainerIds = new Set(prevTrainers.map((trainer) => trainer._id));
        const newTrainers = trainerData.data.trainers.filter(
          (trainer) => !trainerIds.has(trainer._id)
        );
        return [...prevTrainers, ...newTrainers];
      });
    }
  }, [trainerData]);

  const debouncedRefetch = useCallback(debounce(refetchImmediately, 300), [
    refetchImmediately,
  ]);

  // Debounced fetch gyms function
  useEffect(() => {
    debouncedRefetch();
    setAllTrainers([]);
    setPage(1);
  }, [search, sliderValue,experience, debouncedRefetch]);

  useEffect(() => {
    if (!isFetching && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isFetching, isLoadingMore]);

  const fetchMoreData = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  return isFetching && page == 1 && !search && !sliderValue ? (
    <GymListSkeleton />
  ) : (
    <div className="bg-black text-white">
      <Navbar {...{ fixed: true }} />
      <PersonalTrainer
        {...{
          allTrainers,
          trainerData: trainerData?.data.trainers,
          handleBookNow,
          modalOpen,
          handleModal,
          bookingTrainer,
          setBookingTrainer,
          fetchMoreData,
          fullResult: trainerData?.data?.fullResult,
          isLoadingMore,
          setSearch,
          setSliderValue,
          sliderValue,
          maxPrice: maxPriceData?.data.maxPrice[0].maxPrice,
          setExperience,
          experience
        }}
      />
    </div>
  );
};

export default PersonalTrainerPage;
