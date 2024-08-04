import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ar } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { fetchBannersData } from "@/api/user";
import HomeSkeleton from "../skeletons/HomeSkeleton";

const MySliderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  const [activeBanners, setActiveBanners] = useState([]);
  const { isLoading, data: bannerData } = useQuery({
    queryKey: ["userBannerShowData"],
    queryFn: fetchBannersData,
  });

  useEffect(() => {
    if (bannerData) {
      setActiveBanners(
        bannerData.data.banners.filter((banner: any) => !banner.isDeleted)
      );
    }
  }, [bannerData]);

  return isLoading || !bannerData ? (
    <HomeSkeleton />
  ) : (
    <Slider className="min-h-screen" {...settings}>
      {activeBanners.map((banner: any) => (
        <div key={banner._id}>
          <div
            className="bg-no-repeat bg-cover bg-center flex items-center justify-center w-full h-[90vh] lg:h-screen"
            style={{
              backgroundImage: `url(${banner?.bannerImage?.imageUrl})`,
              transition: "background-image 0.5s ease-in-out", // Adjust the height as required
            }}
          ></div>
        </div>
      ))}
    </Slider>
  );
};

export default MySliderBanner;
