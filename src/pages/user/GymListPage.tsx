import { fetchMaxPriceGym, fetchNearGymList } from "@/api/user";
import Navbar from "@/components/common/Navbar";
import GymList from "@/components/user/gymList/GymList";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";
import debounce from "@/utils/miscillenious/debounce";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";

const GymListPage = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [allGyms, setAllGyms] = useState<any[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const { data: maxPriceData } = useQuery({
    queryKey: ["maxPriceInGymListPage"],
    queryFn: fetchMaxPriceGym,
  });
  useEffect(() => {
    if (maxPriceData) {
      setSliderValue(maxPriceData.data.maxPrice[0].maxPrice);
    }
  }, [maxPriceData]);

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
      setAllGyms((prevGyms: any[]) => {
        const gymIds = new Set(prevGyms.map((gym) => gym._id));
        const newGyms = gymData.data.message.filter(
          (gym: any) => !gymIds.has(gym._id)
        );
        return [...prevGyms, ...newGyms];
      });
    }
  }, [gymData]);

  const fetchMoreData = () => {
    
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
