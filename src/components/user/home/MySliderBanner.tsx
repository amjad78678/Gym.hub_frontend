import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MySliderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 4000, 
  };
  const defaultImage = "/banner.png";

  return (
    <Slider {...settings}>
     <div>
        <div
          className="bg-no-repeat bg-cover bg-center flex items-center justify-center w-full"
          style={{
            backgroundImage: `url(${defaultImage})`,
            height: "80vh",
            transition: "background-image 0.5s ease-in-out", // Adjust the height as required
          }}
        ></div>
      </div>

      <div>
        <div
          className="bg-no-repeat bg-cover bg-center flex items-center justify-center w-full"
          style={{
            backgroundImage: `url(${defaultImage})`,
            height: "80vh",
            transition: "background-image 0.5s ease-in-out", // Adjust the height as required
          }}
        ></div>
      </div>
    </Slider>
  );
};

export default MySliderBanner;
