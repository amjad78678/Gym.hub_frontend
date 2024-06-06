import { fetchDashboard } from "@/api/trainer";
import Loader from "@/components/common/Loader";
import TrainerDashboard from "@/components/trainer/dashboard/TrainerDashboard";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const TrainerDashboardPage = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);

  const { isLoading, data: dashboardData } = useQuery({
    queryKey: ["trainerDashboard"],
    queryFn: fetchDashboard,
  });
  return isLoading && !dashboardData ? (
    <Loader />
  ) : (
    <div>
      <TrainerDashboard {...{ dashboard: dashboardData?.data }} />
    </div>
  );
};

export default TrainerDashboardPage;
