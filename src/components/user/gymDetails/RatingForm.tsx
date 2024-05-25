import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextareaAutosize,
  IconButton,
  Input,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import Transition from "../checkout/Transition";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addRatingGym, updateRating, userReviewed } from "@/api/user";

const RatingForm = ({ showReview, handleShowReview, gymId, userReview ,refetchGymReviews}) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const { mutate: ratingMutate } = useMutation({
    mutationFn: addRatingGym,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        handleShowReview();
        refetchGymReviews();

      }
    },
  });

  const {mutate: updateRatingMutate} = useMutation({
    mutationFn: updateRating,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        handleShowReview();
        refetchGymReviews();
      }
    },

  })

  const [currentRating, setCurrentRating] = useState(userReview?.rating);
  const handleReviewedStarClick = (newRating) => {
    setCurrentRating(newRating + 1); 
  };

  return (
    <Dialog
      open={true}
      onClose={handleShowReview}
      maxWidth="xs"
      TransitionComponent={Transition}
      fullWidth
    >
      {userReview ? (
        <Formik
          initialValues={{
            title: userReview.title,
            description: userReview.description,
          }}
          validationSchema={Yup.object({
            title: Yup.string(),
            description: Yup.string(),
          })}
          onSubmit={(values: any) => {
            console.log("iam values from formik", values);
            if (currentRating > 0) {
              updateRatingMutate({ ...values, rating: currentRating, gymId, userReviewId: userReview._id });
            } else {
              toast.error("Please select rating");
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <div className="min-w-1xl flex flex-col items-center">
                  <div className="py-3">
                    <h2 className="text-gray-800 text-xl font-semibold text-center">
                      How was your experience?
                    </h2>
                  </div>

                  <div className="bg-gray-200 w-full flex flex-col items-center py-6 space-y-3">
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, index) => (
                        <IconButton
                          key={index}
                          onClick={() => handleReviewedStarClick(index)}
                        >
                          <Star
                            fontSize="large"
                            className={`${
                              index<currentRating
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />
                        </IconButton>
                      ))}
                    </div>
                  </div>

                  <div className="w-3/4 flex flex-col mt-4">
                    <Field
                      as={Input}
                      name="title"
                      placeholder="Title"
                      className="p-2 my-2 border border-black text-gray-500 rounded-xl w-full"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500"
                    />
                    <Field
                      as={TextareaAutosize}
                      name="description"
                      minRows={2}
                      placeholder="Leave a message, if you want"
                      className="p-4 border border-black text-gray-500 rounded-xl resize-none w-full"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="py-3 my-8 mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                    >
                      Rate now
                    </Button>
                  </div>
                </div>
              </DialogContent>
              <DialogActions className="mx-auto"></DialogActions>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            title: "",
            description: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={(values: any) => {
            console.log("iam values from formik", values);
            if (rating > 0) {
              ratingMutate({ ...values, rating, gymId });
            } else {
              toast.error("Please select rating");
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <div className="min-w-1xl flex flex-col items-center">
                  <div className="py-3">
                    <h2 className="text-gray-800 text-xl font-semibold text-center">
                      How was your experience?
                    </h2>
                  </div>

                  <div className="bg-gray-200 w-full flex flex-col items-center py-6 space-y-3">
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, index) => (
                        <IconButton
                          key={index}
                          onClick={() => handleStarClick(index)}
                        >
                          <Star
                            fontSize="large"
                            className={`${
                              rating > index
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />
                        </IconButton>
                      ))}
                    </div>
                  </div>

                  <div className="w-3/4 flex flex-col mt-4">
                    <Field
                      as={Input}
                      name="title"
                      placeholder="Title"
                      className="p-2 my-2 border border-black text-gray-500 rounded-xl w-full"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500"
                    />
                    <Field
                      as={TextareaAutosize}
                      name="description"
                      minRows={2}
                      placeholder="Leave a message, if you want"
                      className="p-4 border border-black text-gray-500 rounded-xl resize-none w-full"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="py-3 my-8 mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                    >
                      Rate now
                    </Button>
                  </div>
                </div>
              </DialogContent>
              <DialogActions className="mx-auto"></DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default RatingForm;
