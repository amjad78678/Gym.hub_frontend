import { Box, Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { fetchGymDetails } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/common/Loader";
import axios from "axios";

const GymDetails = () => {
  // const {isLoading,data: gymData,refetch}=useQuery({queryKey:['gymDetails'],queryFn:()=>fetchGymDetails(gymId)})

  const queryParams = new URLSearchParams(location.search);
  const gymId = queryParams.get("id");

  console.log("gymId", gymId);

  const {
    isLoading,
    data: gymDetailsData,
    refetch,
  } = useQuery({
    queryKey: ["gymDetails", gymId],
    queryFn: fetchGymDetails,
  });

  const [currentView, setCurrentView] = useState("description");

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

  
  const [streetAddress,setStreetAddress]=useState('')


  useEffect(()=>{
    
   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${gymDetailsData?.data.message.location.coordinates[1]},${gymDetailsData?.data.message.location.coordinates[0]}&key=AIzaSyByuTK8Ngx2fLFeZX2umzie7ghokMJCFR8`).then((res)=>{
    
   setStreetAddress(res.data.results[0].formatted_address)

   })
  },[])

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Container>
        <Row>
          <Col xs={6}>
            <Row>
              <Col xs={3}>
                <img
                  className="mb-3 rounded-lg"
                  src={gymDetailsData?.data.message.images[1].imageUrl}
                  alt=""
                />
                <img
                  className="mb-3 rounded-lg"
                  src={gymDetailsData?.data.message.images[2].imageUrl}
                  alt=""
                />
                <img
                  className="mb-3 rounded-lg"
                  src={gymDetailsData?.data.message.images[3].imageUrl}
                  alt=""
                />
              </Col>

              <Col xs={9}>
                <img
                  className="rounded-lg"
                  src={gymDetailsData?.data.message.images[0].imageUrl}
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

            <p className="my-3 text-xs">
              {" "}
              This fitness membership is perfect for any occasion. Crafted to
              offer superior comfort and style, it's designed to keep you
              motivated and fit.
            </p>

            <p className="text-white text-sm font-mono my-1">
              <LocationOnIcon /> {streetAddress}
            </p>
            <p className="text-white text-sm font-mono my-1">
              <MailOutlineIcon /> {gymDetailsData?.data.message?.email}
            </p>
            <p className="text-white text-sm font-mono my-1">
              <CallOutlinedIcon /> {gymDetailsData?.data.message?.contactNumber}
            </p>

            <ToggleButtonGroup
              color="success"
              sx={{ backgroundColor: "white" }}
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                sx={{ backgroundColor: "gray" }}
                value="quarterlyFee"
              >
                Quarterly
              </ToggleButton>
              <ToggleButton sx={{ backgroundColor: "gray" }} value="monthlyFee">
                Monthly
              </ToggleButton>
              <ToggleButton sx={{ backgroundColor: "gray" }} value="yearlyFee">
                Yearly
              </ToggleButton>
            </ToggleButtonGroup>

            <div>
              <Button
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
                  <p className="text-md text-gray-400 mb-2 ">Gym information</p>
                  {gymDetailsData?.data.message.description}
                </div>
              ) : (
                <div className="border border-gray-400 p-2 rounded-lg">
                  <p className="text-md text-gray-400 mb-2 ">Gym ratings</p>
                  iam review aaneu Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Ipsa facere mollitia recusandae laudantium
                  tempore libero assumenda perferendis, inventore quidem labore
                  doloremque, ab fuga dignissimos, amet consequatur asperiores
                  voluptatum porro enim?
                </div>
              )}
            </Box>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GymDetails;
