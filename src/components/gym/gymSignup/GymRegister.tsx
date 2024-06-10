import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import AddLocation from "./addLocation/AddLocation";
import AddDetails from "./addDetails/AddDetails";
import AddGymImages from "./addImages/AddGymImages";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { gymRegister } from "@/api/gym";
import toast from "react-hot-toast";
import {
  setDetails,
  setImages,
  setLatitude,
  setLongitude,
} from "@/redux/slices/appSlice";
import Loader from "@/components/common/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

interface UserType {
  setShowOtp: () => void;
}

interface GymDetails {
  gymName: string;
  email: string;
  contactNumber: string;
  state: string;
  city: string;
  pincode: string;
  businessId: string;
  dailyFee: string;
  monthlyFee: string;
  yearlyFee: string;
  description: string;
  password: string;
  confirmPassword: string;
}


interface AppState {
  lat: number;
  long: number;
  details: GymDetails;
  images: any[];
}

interface iState {
  app: AppState;
}

interface iRootState {
  auth: {
    gLoggedIn: boolean;
  };
}

const GymRegister: React.FC<UserType> = ({ setShowOtp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gLoggedIn } = useSelector((state: iRootState) => state.auth);
  useEffect(() => {
    if (gLoggedIn) {
      navigate("gym/dashboard");
    }
  }, [navigate, gLoggedIn]);

  const { lat, long, details, images } = useSelector(
    (state: iState) => state.app
  );

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

  const handleSubmitAllDetails = () => {
    if (streetAddress) {
      const formData = new FormData();
      formData.append("gymName", details.gymName);
      formData.append("email", details.email);
      formData.append("contactNumber", details.contactNumber);
      formData.append("state", details.state);
      formData.append("city", details.city);
      formData.append("pincode", details.pincode);
      formData.append("dailyFee", details.dailyFee);
      formData.append("monthlyFee", details.monthlyFee);
      formData.append("yearlyFee", details.yearlyFee);
      formData.append("description", details.description);
      formData.append("businessId", details.businessId);
      formData.append("password", details.password);
      formData.append("confirmPassword", details.confirmPassword);
      formData.append("address", streetAddress);

      // Append images to formData
      images.forEach((image) => {
        formData.append(`images`, image );
      });

      // Append location data
      formData.append("long", long.toString());
      formData.append("lat", lat.toString());

      gymRegisterMutate(formData);
    }
  };

  const {
    isPending,
    status: registerStatus,
    mutate: gymRegisterMutate,
  } = useMutation({
    mutationFn: gymRegister,
    onSuccess: (res) => {
      if (res) {
        if (res.data.status) {
          dispatch(setLatitude(0));
          dispatch(setLongitude(0));
          dispatch(setDetails({}));
          dispatch(setImages([]));
          setShowOtp();
          toast.success(res.data.message);
        }
      }
    },
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      const stepIndex = findUnfinishedSteps();
      setActiveStep(stepIndex);
    }
  };
  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;

    const index = findUnfinishedSteps();

    if (index != -1) return false;

    return true;
  };

  const findUnfinishedSteps = () => {
    return steps.findIndex((step) => !step.completed);
  };

  const [activeStep, setActiveStep] = useState(0);

  const [steps, setSteps] = useState([
    { label: "Location", completed: false },
    { label: "Details", completed: false },
    { label: "Images", completed: false },
  ]);
  useEffect(() => {
    if (long || lat) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [lat, long]);

  useEffect(() => {
    if (
      details?.gymName?.length > 0 &&
      details?.email?.length > 0 &&
      details?.contactNumber?.length > 0 &&
      details?.businessId?.length > 0 &&
      details?.password?.length > 0 &&
      details?.confirmPassword?.length > 0 &&
      details?.description?.length > 0 &&
      details.dailyFee?.length > 0 &&
      details.monthlyFee?.length > 0 &&
      details.yearlyFee?.length > 0
    ) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);

  useEffect(() => {
    if (images.length === 4) {
      if (!steps[2].completed) setComplete(2, true);
    } else {
      if (steps[2].completed) setComplete(2, false);
    }
  }, [images]);

  const setComplete = (index: number, status: boolean) => {
    setSteps((steps) => {
      steps[index].completed = status;
      return [...steps];
    });
  };

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
              0: <AddLocation />,
              1: <AddDetails />,
              2: <AddGymImages />,
            }[activeStep]
          }
        </Box>

        <Stack
          direction="row"
          sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
        >
          <Button
            color="primary"
            disabled={!activeStep}
            onClick={() =>
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }
          >
            Back
          </Button>

          {steps.every((step) => step.completed == true) ? (
            <Button
              className="relative"
              disabled={isPending}
              onClick={handleSubmitAllDetails}
              color="success"
            >
              <span>{isPending ? "Please wait..." : "Register"}</span>
              {isPending && (
                <CircularProgress
                  size={24}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </Button>
          ) : (
            <Button disabled={checkDisabled()} onClick={handleNext}>
              Next
            </Button>
          )}
        </Stack>
      </Container>
      {registerStatus === "pending" && <Loader />}
    </div>
  );
};

export default GymRegister;
