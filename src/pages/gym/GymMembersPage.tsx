import { fetchGymMembershipsBooked } from "@/api/gym";
import Loader from "@/components/common/Loader";
import GymNavbar from "@/components/gym/common/GymNavbar";
import GymMemberships from "@/components/gym/gymMembers/GymMemberships";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const GymMembersPage = () => {
  const {
    isLoading,
    data: memberShipData,
    refetch,
  } = useQuery({
    queryKey: ["membershipDataOfGymSide"],
    queryFn: fetchGymMembershipsBooked,
  });

  console.log("iam membership data", memberShipData);
  return isLoading || !memberShipData ? (
    <>
    <GymNavbar {...{ fixed: false }} />
    <Loader />
    </>
  ) : (
    <>
      <GymNavbar {...{ fixed: false }} />
      <GymMemberships {...{ subscriptionData: memberShipData }} />
    </>
  );
};

export default GymMembersPage;
