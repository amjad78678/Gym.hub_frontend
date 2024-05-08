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

  const handleSubmitAllDetails = () => {

    const formData = new FormData();
    formData.append('gymName', details.gymName);
    formData.append('email', details.email);
    formData.append('contactNumber', details.contactNumber);
    formData.append('state', details.state);
    formData.append('city', details.city);
    formData.append('pincode', details.pincode);
    formData.append('dailyFee', details.dailyFee);
    formData.append('monthlyFee', details.monthlyFee);
    formData.append('yearlyFee', details.yearlyFee);
    formData.append('description', details.description);
    formData.append('businessId', details.businessId);
    formData.append('password', details.password);
    formData.append('confirmPassword', details.confirmPassword);
  
    // Append images to formData
    images.forEach((image) => {
      formData.append(`images`, image);
    });
  
    // Append location data
    formData.append('long', long.toString());
    formData.append('lat', lat.toString());

    gymRegisterMutate(formData);
  };

  const { status: registerStatus, mutate: gymRegisterMutate } = useMutation({
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

  //handles the complete of each stepper
  useEffect(() => {
    if (long || lat) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [lat, long]);

  useEffect(() => {
    if (
      (details?.gymName?.length > 0 && details?.email?.length > 0,
      details?.contactNumber > 0 && details?.state?.length > 0,
      details?.city?.length > 0 && details?.pincode?.length > 0,
      details?.businessId?.length > 0 &&
        details?.password?.length > 0 &&
        details?.confirmPassword?.length > 0 &&
        details?.description?.length > 0 &&
        details.dailyFee > 0 &&
        details.monthlyFee > 0 &&
        details.yearlyFee > 0)
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
            <Button onClick={handleSubmitAllDetails} color="success">
              Finish
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
