import React, { useState } from "react";
import GymDetails from "@/components/user/gymDetails/GymDetails";
import Navbar from "@/components/common/Navbar";
import RatingForm from "@/components/user/gymDetails/RatingForm";
import { fetchGymReviews, isReviewPossible } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const GymDetailsPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const gymId = queryParams.get("id");
  const [showReview, setShowReview] = useState(false);

  const { data: gymReviews, refetch: refetchGymReviews } = useQuery({
    queryKey: ["ReviewsDataGymDetail", gymId],
    queryFn: fetchGymReviews,
  });

  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const { data: isPossible } = useQuery({
    queryKey: ["isReviewPossible", gymId],
    queryFn: isReviewPossible,
    enabled: uLoggedIn,
  });

  const handleShowReview = () => {
    setShowReview(!showReview);
  };
  return (
    <>
      <div className="bg-black min-h-screen text-white">
        <Navbar {...{ fixed: true }} />
        <GymDetails {...{ handleShowReview, gymReviews, isPossible }} />
      </div>

      {showReview && (
        <RatingForm
          {...{
            showReview,
            handleShowReview,
            gymId,
            userReview: gymReviews?.data.isUserReviewed,
            refetchGymReviews,
          }}
        />
      )}
    </>
  );
};

export default GymDetailsPage;
