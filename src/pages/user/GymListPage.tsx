import { fetchMaxPriceGym, fetchNearGymList } from "@/api/user";
import Navbar from "@/components/common/Navbar";
import GymList from "@/components/user/gymList/GymList";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";
import debounce from "@/utils/miscillenious/debounce";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

const GymListPage = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allGyms, setAllGyms] = useState([]);

  const { data: maxPriceData } = useQuery({
    queryKey: ["maxPrice"],
    queryFn: fetchMaxPriceGym,
  });

  const [sliderValue, setSliderValue] = useState(
    maxPriceData?.data.maxPrice[0].maxPrice
  );

  const {
    isFetching,
    data: gymData,
    refetch: refetchImmediately,
  } = useQuery({
    queryKey: ["gymsListUserSide", page],
    queryFn: () => {
      return fetchNearGymList({
        latitude: location.latitude,
        longitude: location.longitude,
        page: page,
        search: search,
        sliderValue: sliderValue,
      });
    },
    enabled: location.latitude !== null && location.longitude !== null,
  });

  useEffect(() => {
    if (gymData) {
      setAllGyms((prevGyms) => {
        const gymIds = new Set(prevGyms.map((gym) => gym._id));
        const newGyms = gymData.data.message.filter(
          (gym) => !gymIds.has(gym._id)
        );
        return [...prevGyms, ...newGyms];
      });
    }
  }, [gymData]);

  const fetchMoreData = () => {
    console.log("fetch more data", page);
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!isFetching && isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [isFetching, isLoadingMore]);

  const debouncedRefetch = useCallback(debounce(refetchImmediately, 300), [
    refetchImmediately,
  ]);
  // Debounced fetch gyms function
  useEffect(() => {
    debouncedRefetch();
    setAllGyms([]);
    setPage(1);
  }, [
    search,
    sliderValue,
    location.latitude,
    location.longitude,
    debouncedRefetch,
  ]);

  return isFetching && page === 1 && !search && !sliderValue ? (
    <GymListSkeleton />
  ) : (
    <div className="bg-black">
      <Navbar {...{ fixed: true }} />
      <GymList
        {...{
          fetchMoreData,
          gyms: gymData?.data.message,
          maxPrice: maxPriceData?.data.maxPrice[0].maxPrice,
          setLocation,
          isLoadingMore,
          search,
          setSearch,
          allGyms,
          setSliderValue,
          sliderValue,
        }}
      />
    </div>
  );
};

export default GymListPage;
