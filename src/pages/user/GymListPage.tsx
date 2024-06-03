import { fetchNearGymList } from "@/api/user";
import Navbar from "@/components/common/Navbar";
import GymList from "@/components/user/gymList/GymList";
import GymListSkeleton from "@/components/user/skeletons/GymListSkeleton";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const GymListPage = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [page, setPage] = useState(1);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    isFetching,
    data: gymData,
    refetch,
  } = useQuery({
    queryKey: ["gymsListUserSide", page],
    queryFn: () => {
      return fetchNearGymList({
        latitude: location.latitude,
        longitude: location.longitude,
        page: page,
      });
    },
    enabled: location.latitude !== null && location.longitude !== null,
  });

  console.log("iam gymdata", gymData);
  console.log("iam location", location);

  useEffect(() => {
    if (gymData) {
      setFilteredItems((prevGyms) => {
        const newGyms = gymData.data.message.filter((newGym) => {
          return !prevGyms.some(
            (existingGym) => existingGym._id === newGym._id
          );
        });
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

  return isFetching && page === 1 ? (
    <GymListSkeleton />
  ) : (
    <div className="bg-black">
      <Navbar {...{ fixed: true }} />
      <GymList
        {...{
          fetchMoreData,
          gyms: filteredItems,
          totalGyms: gymData?.data.total,
          setLocation,
          isLoadingMore,
        }}
      />
    </div>
  );
};

export default GymListPage;
