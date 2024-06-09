import { fetchGymData } from "@/api/gym";
import Loader from "@/components/common/Loader";
import GymNavbar from "@/components/gym/common/GymNavbar";
import GymProfile from "@/components/gym/gymProfile/GymProfile";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const GymProfilePage = () => {
  const { isLoading, data: myGymData,refetch } = useQuery({
    queryKey: ["gymSideProfileData"],
    queryFn: fetchGymData,
  });

  console.log(myGymData?.data.gymData);
  return isLoading || !myGymData ? (
    <>
      <GymNavbar {...{ fixed: true }} />
      <Loader />
    </>
  ) : (
    <div className="text-white">
      <GymNavbar {...{ fixed: true }} />
      <GymProfile {...{ gym: myGymData?.data.gymData,refetch }} />
    </div>
  );
};

export default GymProfilePage;
