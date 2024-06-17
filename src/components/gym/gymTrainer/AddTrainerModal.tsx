import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { addTrainer } from "@/api/gym";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "@/components/common/Loader";
import { AddTrainerValidation } from "@/validation/AddTrainerValidation";
import { BeatLoader } from "react-spinners";

const AddTrainerModal = ({ open, setOpen, refetch }) => {
  const {
    isPending,
    status: mutStatus,
    mutate,
  } = useMutation({
    mutationFn: addTrainer,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        refetch();
        setOpen(false);
      }
    },
  });

  const [image, setImage] = useState<File | null>(null);

  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="xs">
        <DialogTitle>
          Add Trainer{" "}
          <IconButton onClick={() => setOpen(false)} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>

        <Formik
          initialValues={{
            imageUrl: null,
            name: "",
            age: "",
            gender: "",
            experience: "",
            achievements: "",
            monthlyFee: "",
            yearlyFee: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={AddTrainerValidation}
          onSubmit={(values) => {
            

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("gender", values.gender);
            formData.append("age", values.age);
            formData.append("experience", values.experience);
            formData.append("achievements", values.achievements);
            formData.append("monthlyFee", values.monthlyFee);
            formData.append("yearlyFee", values.yearlyFee);
            formData.append("email", values.email);
            formData.append("password", values.password);

            if (values.imageUrl) {
              if (image != null) {
                formData.append("imageUrl", image);
              }
            }

            mutate(formData);
          }}
        >
          {({
            setFieldValue,
            handleSubmit,
            values,
            handleChange,
            setFieldTouched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  {values.imageUrl && (
                    <img
                      className="rounded-xl mx-auto object-cover w-1/2 "
                      src={URL.createObjectURL(values.imageUrl)}
                      alt="Selected"
                    />
                  )}
                  <TextField
                    label="Image"
                    name="imageUrl"
                    type="file"
                    onChange={(e) => {
                      const target = e.currentTarget as HTMLInputElement;
                      if (
                        target.type === "file" &&
                        target.files &&
                        target.files[0]
                      ) {
                        setFieldValue("imageUrl", target.files[0]);
                        setImage(target.files[0]);
                      }
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage name="imageUrl">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>

                  <Field
                    as={TextField}
                    label="Name"
                    name="name"
                    variant="outlined"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Field
                      as={TextField}
                      label="Age"
                      sx={{ width: "100%" }}
                      name="age"
                      variant="outlined"
                    />

                    <FormControl fullWidth>
                      <InputLabel id="gender-select-label">Gender</InputLabel>
                      <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        name="gender"
                        value={values.gender}
                        label="Gender"
                        onChange={handleChange}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ErrorMessage name="age">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </Stack>
                  <Field
                    as={TextField}
                    label="Experience"
                    name="experience"
                    variant="outlined"
                  />
                  <ErrorMessage name="experience">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                  <Field
                    as={TextField}
                    label="Achievements"
                    name="achievements"
                    variant="outlined"
                  />
                  <ErrorMessage name="achievements">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Field
                      as={TextField}
                      label="Monthly Price"
                      sx={{ width: "100%" }}
                      name="monthlyFee"
                      variant="outlined"
                    />

                    <Field
                      as={TextField}
                      sx={{ width: "100%" }}
                      label="Yearly Price"
                      name="yearlyFee"
                      variant="outlined"
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ErrorMessage name="monthlyFee">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                    <ErrorMessage name="yearlyFee">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </Stack>

                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    variant="outlined"
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                  <Field
                    as={TextField}
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    type="password"
                  />
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </Stack>
              </DialogContent>
              <DialogActions>
              <Button
                  type="submit"
                  color="primary"
                  disabled={isPending}
                  className="relative w-9/12"
                  variant="contained"
                  sx={{  mx: "auto" }}
                >
                  <span>{isPending ? "Adding..." : "Add Trainer"}</span>
                  {isPending && (
                    <span className="absolute right-4 top-2">
                      <BeatLoader />
                    </span>
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      {mutStatus === "pending" && <Loader />}
    </div>
  );
};

export default AddTrainerModal;
