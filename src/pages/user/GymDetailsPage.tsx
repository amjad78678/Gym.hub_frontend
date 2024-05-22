import React, { useState } from "react";
import GymDetails from "@/components/user/gymDetails/GymDetails";
import Navbar from "@/components/common/Navbar";
import RatingForm from "@/components/user/gymDetails/RatingForm";


const GymDetailsPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const gymId = queryParams.get("id");
  const [showReview,setShowReview]=useState(false)

 const handleShowReview = () => {
    setShowReview(!showReview);
  }
  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <GymDetails {...{handleShowReview}} />
      </div>

      {showReview && (
        <RatingForm {...{showReview,handleShowReview,gymId}} />
      )}
    </>
  );
};

export default GymDetailsPage;
