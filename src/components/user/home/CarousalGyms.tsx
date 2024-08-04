import React, { useState } from "react";
import CarousalCard from "./CarousalCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const CarousalGyms = ({ loading, gyms }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };



  return (
    gyms?.length > 0 && (
      <div id="carouselCards">
        <Carousel responsive={responsive}>
          {gyms.map((gym, index) => {
            return <CarousalCard key={index} gym={gym} />;
          })}
        </Carousel>
      </div>
    )
  );
};

export default CarousalGyms;
