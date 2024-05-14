import { Box, Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { addToCart, fetchGymDetails } from "@/api/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import CalenderDatePicker from "@/components/user/gymDetails/CalenderDatePicker";
import Backdrop from "@/pages/common/Backdrop";

const GymDetails = () => {
  const queryParams = new URLSearchParams(location.search);
  const gymId = queryParams.get("id");
  const [showCalender, setShowCalender] = useState(false);
  const [dailyDate, setDailyDate] = useState({ startDate: "", endDate: "" });

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
        }
        
      }else{
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
            <Col xs={6}>
              <Row>
                <Col xs={3}>
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

                <Col className="mb-3" xs={9}>
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
            </Col>

            <Col xs={6}>
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
                sx={{ backgroundColor: "white", my: 3 }}
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
                Gym description
              </p>
              {currentView === "description" ? (
                <div className="w-full h-1 bg-white mt-1 mb-5"></div>
              ) : (
                <div className="w-full h-1 bg-gray-600 mt-1 mb-5"></div>
              )}
            </Col>

            <Col>
              <p
                onClick={() => setCurrentView("reviews")}
                className="mt-12 text-center text-xl cursor-pointer"
              >
                Reviews
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
                  <div className="border border-gray-400 p-2 rounded-lg">
                    <p className="text-md text-gray-400 mb-2 ">
                      Gym information
                    </p>
                    {gymDetailsData?.data.message.description}
                  </div>
                ) : (
                  <div className="border border-gray-400 p-2 rounded-lg">
                    <p className="text-md text-gray-400 mb-2 ">Gym ratings</p>
                    iam review aaneu Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Ipsa facere mollitia recusandae laudantium
                    tempore libero assumenda perferendis, inventore quidem
                    labore doloremque, ab fuga dignissimos, amet consequatur
                    asperiores voluptatum porro enim?
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
