import { fetchBanners } from "@/api/admin";
import AdminBanner from "@/components/admin/adminBanner/AdminBanner";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AdminBannerPage = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  const [activeBanners, setActiveBanners] = useState([]);
  const {
    isLoading,
    data: bannerData,
    refetch,
  } = useQuery({
    queryKey: ["adminBannerDetailsShow"],
    queryFn: fetchBanners,
  });

  useEffect(() => {
    if (bannerData) {
      setActiveBanners(
        bannerData.data.banners.filter((banner) => !banner.isDeleted)
      );
    }
  }, [bannerData]);

  return (
    !isLoading &&
    activeBanners && (
      <div>
        <AdminBanner {...{ bannerData: activeBanners, refetch }} />
      </div>
    )
  );
};

export default AdminBannerPage;
