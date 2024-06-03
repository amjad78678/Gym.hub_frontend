import { Box, Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { addToCart, fetchGymDetails, isReviewPossible } from "@/api/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import CalenderDatePicker from "@/components/user/gymDetails/CalenderDatePicker";
import Backdrop from "@/pages/common/Backdrop";
import {
  CheckCircle,
  Star,
  Edit,
  CallOutlined as CallOutlinedIcon,
  MailOutline as MailOutlineIcon,
  LocationOn as LocationOnIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const GymDetails = ({ handleShowReview, gymReviews }) => {
  const queryParams = new URLSearchParams(location.search);
  const gymId = queryParams.get("id");
  const [showCalender, setShowCalender] = useState(false);

  const {
    isLoading,
    data: gymDetailsData,
    refetch,
  } = useQuery({
    queryKey: ["gymDetails", gymId],
    queryFn: fetchGymDetails,
  });

  const [currentView, setCurrentView] = useState("description");
  const navigate = useNavigate();

  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const { data: isPossible } = useQuery({
    queryKey: ["isReviewPossible", gymId],
    queryFn: isReviewPossible,
    enabled: uLoggedIn,
  });

  const [value, setValue] = useState(4);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [alignment, setAlignment] = useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleImageHover = (index) => {
    setMainImageIndex(index);
  };

  const { mutate: addCartMutation } = useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      if (res) {
        if (res.data.success) {
          navigate("/checkout");
        } else if (res.data.failure) {
          toast.error(res.data.message);
        }
      } else {
        navigate("/user-login");
      }
    },
  });

  const handlePurchase = () => {
    if (alignment === "Daily") {
      setShowCalender(true);
    } else if (alignment === "Monthly") {
      const data = {
        gymId: gymId,
        date: new Date(),
        expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        subscriptionType: alignment,
        amount: gymDetailsData?.data.message.subscriptions.Monthly,
        totalPrice: gymDetailsData?.data.message.subscriptions.Monthly,
      };
      addCartMutation(data);
    } else if (alignment === "Yearly") {
      const data = {
        gymId: gymId,
        date: new Date(),
        expiryDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        subscriptionType: alignment,
        amount: gymDetailsData?.data.message.subscriptions.Yearly,
        totalPrice: gymDetailsData?.data.message.subscriptions.Yearly,
      };
      addCartMutation(data);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div>
        <Container>
          <Row>
            <Col lg={6}>
              {/* For Large Screens */}
              <Row className="d-none d-lg-flex">
                <Col lg={3}>
                  {gymDetailsData?.data.message.images.map((image, index) => (
                    <img
                      key={index}
                      className="mb-3 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                      src={image.imageUrl}
                      alt=""
                      onMouseEnter={() => handleImageHover(index)}
                    />
                  ))}
                </Col>

                <Col lg={9}>
                  <img
                    className="rounded-lg w-full h-full object-cover"
                    src={
                      gymDetailsData?.data.message.images[mainImageIndex]
                        .imageUrl
                    }
                    alt=""
                  />
                </Col>
              </Row>
              {/* For Smaller Screens */}
              <Row className="d-lg-none">
                <Col xs={12}>
                  <Carousel indicators={false}>
                    {gymDetailsData?.data.message.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100 mb-4"
                          src={image.imageUrl}
                          alt=""
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>
              </Row>
            </Col>

            <Col lg={6}>
              <h1 className="text-2xl font-serif">
                {gymDetailsData?.data.message.gymName}
              </h1>

              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  readOnly
                />
                {value !== null && <Box sx={{ ml: 2 }}>{labels[value]}</Box>}
              </Box>

              <p className="my-3 text-sm">
                {" "}
                This fitness membership is perfect for any occasion. Crafted to
                offer superior comfort and style, it's designed to keep you
                motivated and fit.
              </p>

              <p className="text-white text-sm font-mono my-2">
                <LocationOnIcon /> {gymDetailsData?.data.message?.address}
              </p>
              <p className="text-white text-sm font-mono my-2">
                <MailOutlineIcon /> {gymDetailsData?.data.message?.email}
              </p>
              <p className="text-white text-sm font-mono my-2">
                <CallOutlinedIcon />{" "}
                {gymDetailsData?.data.message?.contactNumber}
              </p>

              <ToggleButtonGroup
                color="success"
                sx={{ backgroundColor: "white", my: 2 }}
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton sx={{ backgroundColor: "gray" }} value="Daily">
                  Daily
                </ToggleButton>

                <ToggleButton sx={{ backgroundColor: "gray" }} value="Monthly">
                  Monthly
                </ToggleButton>
                <ToggleButton sx={{ backgroundColor: "gray" }} value="Yearly">
                  Yearly
                </ToggleButton>
              </ToggleButtonGroup>

              <div>
                <Button
                  onClick={handlePurchase}
                  sx={{
                    color: "white",
                    backgroundColor: "green",
                    borderRadius: "10px",
                    my: 1,
                    "&:hover": {
                      backgroundColor: "#4caf50",
                    },
                  }}
                >
                  Purchase now
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <p
                onClick={() => setCurrentView("description")}
                className="mt-12 text-center text-xl cursor-pointer"
              >
                Description
              </p>
              {currentView === "description" ? (
                <div className="w-full h-1 bg-white mt-1 mb-5 "></div>
              ) : (
                <div className="w-full h-1 bg-gray-600 mt-1 mb-5"></div>
              )}
            </Col>

            <Col>
              <p
                onClick={() => setCurrentView("reviews")}
                className="mt-12 text-center text-xl cursor-pointer"
              >
                Reviews ({gymReviews?.data.reviews.length})
              </p>
              {currentView === "reviews" ? (
                <div className="w-full h-1 bg-white mt-1 mb-5"></div>
              ) : (
                <div className="w-full h-1 bg-gray-600 mt-1 mb-5"></div>
              )}
            </Col>
          </Row>

          <Row className="nopadding">
            <Col>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                {currentView === "description" ? (
                  <div className="border border-gray-400 p-4 rounded-sm">
                    <h2 className="text-xl font-serif  text-white mb-2 ">
                      Gym information
                    </h2>

                    <p className="text-gray-300">
                      {gymDetailsData?.data.message.description}
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-400 p-4 rounded-sm">
                    <div className="flex justify-between">
                      <h2 className="text-xl font-serif  text-white mb-2 ">
                        Gym ratings ({gymReviews?.data.reviews.length})
                      </h2>

                      {gymReviews?.data.isUserReviewed && (
                        <>
                          <button
                            onClick={handleShowReview}
                            className="btn group mt-[-10px] mb-2 border-yellow-500 flex items-center bg-transparent p-2 px-6 text-xl font-thin tracking-widest text-white"
                          >
                            <span className="hidden lg:block relative text-center  pb-1 text-white after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100">
                              Edit Review
                            </span>
                            <span>
                              <Edit />
                            </span>
                          </button>
                        </>
                      )}

                      {isPossible?.data.isPossible &&
                        !gymReviews?.data.isUserReviewed && (
                          <>
                            <button
                              onClick={handleShowReview}
                              className="btn group mt-[-10px] mb-2 border-yellow-500 flex items-center bg-transparent p-2 px-6 text-xl font-thin tracking-widest text-white"
                            >
                              <span className="relative text-center  pb-1 text-white after:transition-transform after:duration-500 after:ease-out after:absolute after:bottom-0 after:left-0 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-500 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100">
                                Rate Review
                              </span>
                            </button>
                          </>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-scroll no-scrollbar">
                      {gymReviews?.data.reviews.map((review) => (
                        <p key={review._id} className="text-gray-200">
                          <div className="flex items-center">
                            <p className="text-white text-sm font-bold mt-1">
                              {review.userId.username.toUpperCase()}
                            </p>
                            <span>
                              <CheckCircle
                                sx={{ my: 0, color: "green" }}
                                fontSize="inherit"
                              />
                            </span>{" "}
                            <p className="ms-1 mt-1 font-mono font-semibold lg:flex">
                              <span className="hidden lg:block">
                                Certified Buyer
                              </span>
                              <span className="lg:ms-2">
                                - {dayjs(review.createdAt).format("DD MMM YY")}
                              </span>
                            </p>
                          </div>

                          <div className="grid lg:grid-cols-12 border-b-2 my-2 border-gray-400">
                            <div className="col-span-2">
                              <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                  <Star
                                    fontSize="medium"
                                    className={`${
                                      index < review.rating
                                        ? "text-yellow-500"
                                        : "text-gray-400"
                                    } my-1`}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="col-span-10 my-1 pb-4 lg:ml-[-20px]">
                              <h1 className="text-xl font-serif font-bold">
                                {review.title}
                              </h1>
                              <p className="text-gray-300">
                                {review.description}
                              </p>
                            </div>
                          </div>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </Box>
            </Col>
          </Row>
        </Container>
      </div>
      {showCalender && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-root") as HTMLElement
          )}

          {ReactDOM.createPortal(
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-20">
              <CalenderDatePicker
                isOpen={showCalender}
                onToggle={() => setShowCalender(!showCalender)}
                {...{
                  gymDetailsData: gymDetailsData?.data.message,
                  subscriptionType: alignment,
                }}
              />
            </div>,
            document.getElementById("root-modal") as HTMLElement
          )}
        </>
      )}
    </>
  );
};

export default GymDetails;
