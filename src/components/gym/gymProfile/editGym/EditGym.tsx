import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import EditGymDetails from "./EditGymDetails";
import EditGymImages from "./EditGymImages";
import EditLocation from "./EditLocation";
import Loader from "@/components/common/Loader";
import axios from "axios";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

interface UserType {
  setShowOtp: () => void;
}

interface GymDetails {
  gymName: string;
  email: string;
  contactNumber: number;
  state: string;
  city: string;
  pincode: string;
  businessId: string;
  dailyFee: number;
  monthlyFee: number;
  yearlyFee: number;
  description: string;
  password: string;
  confirmPassword: string;
}

interface Image {
  imageUrl: string;
  public_id: string;
}

interface AppState {
  lat: number;
  long: number;
  details: GymDetails;
  images: Image[];
}

interface iState {
  app: AppState;
}

interface iRootState {
  auth: {
    gLoggedIn: boolean;
  };
}

const EditGym: React.FC<UserType> = ({ gym }) => {
  const [details, setDetails] = useState({});
  const { lat, long, images } = useSelector((state: iState) => state.app);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: "Location", completed: false },
    { label: "Details", completed: false },
    { label: "Images", completed: false },
  ]);
  const [streetAddress, setStreetAddress] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`
      )
      .then((res) => {
        setStreetAddress(res.data.results[0].formatted_address);
      });
  }, [lat, long]);

  return (
    <div>
      <Container sx={{ py: 5 }}>
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          sx={{ mb: 4 }}
        >
          {steps.map((step, index) => (
            <Step
              sx={{ color: "white" }}
              key={step.label}
              completed={step.completed}
            >
              <StepButton onClick={() => setActiveStep(index)}>
                <p className="text-white">{step.label}</p>
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Box>
          {
            {
              0: <EditLocation {...{ gym }} />,
              1: <EditGymDetails {...{ gym, setDetails }} />,
              2: <EditGymImages {...{ gym }} />,
            }[activeStep]
          }
        </Box>

        <Stack
          direction="row"
          sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
        ></Stack>
      </Container>
    </div>
  );
};

export default EditGym;
