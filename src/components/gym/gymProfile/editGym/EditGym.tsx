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
import { useMutation } from "@tanstack/react-query";
import EditGymDetails from "./EditGymDetails";
import EditGymImages from "./EditGymImages";
import EditLocation from "./EditLocation";
import Loader from "@/components/common/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { editGymProfile } from "@/api/gym";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

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
interface UserType {
  gym: GymDetails;
  refetch: () => void;
}

const EditGym: React.FC<UserType> = ({ gym, refetch }) => {
  const [details, setDetails] = useState({});
  const [latitude, setLatitude] = useState(gym[0].location.coordinates[1]);
  const [longitude, setLongitude] = useState(gym[0].location.coordinates[0]);
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
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
      )
      .then((res) => {
        setStreetAddress(res.data.results[0].formatted_address);
      });
  }, [latitude, longitude]);

  const { isPending, mutate: editGymMutate } = useMutation({
    mutationFn: editGymProfile,
    onSuccess: (res) => {
      if (res) {
        if (res?.data.success) {
          refetch();
          toast.success(res?.data.message);
        }
      }
    },
  });

  const handleSubmitEditDetails = (editDetails) => {
    editGymMutate({
      ...editDetails,
      address: streetAddress,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
  };

  return (
    <div>
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
            0: (
              <EditLocation
                {...{
                  gym,
                  setLatitude,
                  setLongitude,
                  latitude,
                  longitude,
                  isPending,
                  handleSubmitEditDetails,
                }}
              />
            ),
            1: (
              <EditGymDetails
                {...{ gym, setDetails, handleSubmitEditDetails, isPending }}
              />
            ),
            2: <EditGymImages {...{ gym, refetch }} />,
          }[activeStep]
        }
      </Box>
    </div>
  );
};

export default EditGym;
