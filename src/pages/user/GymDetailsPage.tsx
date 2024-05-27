import React, { useState } from "react";
import GymDetails from "@/components/user/gymDetails/GymDetails";
import Navbar from "@/components/common/Navbar";
import RatingForm from "@/components/user/gymDetails/RatingForm";
import { fetchGymReviews } from "@/api/user";
import { useQuery } from "@tanstack/react-query";


const GymDetailsPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const gymId = queryParams.get("id");
  const [showReview,setShowReview]=useState(false)


  const {data: gymReviews,refetch:refetchGymReviews}=useQuery({
    queryKey: ["ReviewsDataGymDetail", gymId],
    queryFn: fetchGymReviews,
  })

 const handleShowReview = () => {
    setShowReview(!showReview);
  }
  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <Navbar {...{fixed: true}}/>
        <GymDetails {...{handleShowReview,gymReviews}} />
      </div>

      {showReview && (
        <RatingForm {...{showReview,handleShowReview,gymId,userReview:gymReviews?.data.isUserReviewed,refetchGymReviews}} />
      )}
    </>
  );
};

export default GymDetailsPage;
