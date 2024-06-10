import React from "react";
import GymDashboard from "@/components/gym/gymDashboard/GymDashboard";
import GymNavbar from "@/components/gym/common/GymNavbar";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardDetails, fetchGymData } from "@/api/gym";
import Skeleton from "react-loading-skeleton";

const GymDashboardPage = () => {
  const { isLoading, data: myGymData } = useQuery({
    queryKey: ["gymSideDashboardGymData"],
    queryFn: fetchGymData,
  });

  const { isLoading: isLoadingDetails, data: dashboardDetails } = useQuery({
    queryKey: ["gymDashboardDetails"],
    queryFn: fetchDashboardDetails,
  });

  console.log("dashboardDetails", dashboardDetails);

  return isLoading || isLoadingDetails || !dashboardDetails || !myGymData ? (
    <>
      <GymNavbar {...{ fixed: true }} />
      <Skeleton height={500} count={2} />
    </>
  ) : (
    <div>
      <GymNavbar {...{ fixed: true }} />
      <GymDashboard
        {...{ gym: myGymData?.data.gymData, dashboard: dashboardDetails?.data }}
      />
    </div>
  );
};

export default GymDashboardPage;
