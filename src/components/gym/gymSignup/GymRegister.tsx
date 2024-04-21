import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import AddLocation from "./AddLocation";
import AddDetails from "./AddDetails";
import AddGymImages from "./addImages/AddGymImages";

const GymRegister = () => {
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

  const [steps] = useState([
    { label: "Location", completed: false },
    { label: "Details", completed: false },
    { label: "Images", completed: false },
  ]);
  return (
    <Container sx={{py:5 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 4}}
      >
        {steps.map((step, index) => (
          <Step sx={{color:"white"}} key={step.label} completed={step.completed}>
            <StepButton  onClick={() => setActiveStep(index)}>
             <p className="text-white">{step.label}</p> 
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Box>{{
        0: <AddLocation/>,
        1: <AddDetails/>,
        2: <AddGymImages/>,
      }[activeStep]}</Box>

      <Stack
        direction="row"
        sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
      >
        <Button
          color="primary"
          disabled={!activeStep}
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
        >
          Back
        </Button>

        <Button disabled={checkDisabled()} onClick={handleNext}>
          Next
        </Button>
      </Stack>
    </Container>
  );
};

export default GymRegister;
