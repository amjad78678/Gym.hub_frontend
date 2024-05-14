import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { addTrainer, updateTrainer } from "@/api/gym";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditTrainerValidation } from "@/validation/EditTrainerValidation";

const EditTrainerModal = ({ editOpen, setEditOpen, refetch, selectedRow }) => {
  const [image, setImage] = useState<File | null>(null);

  const { status: mutStatus, mutate } = useMutation({
    mutationFn: updateTrainer,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        refetch();
        setEditOpen(false);
      }
    },
  });

  return (
    <div>
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Edit Trainer{" "}
          <IconButton
            onClick={() => setEditOpen(false)}
            style={{ float: "right" }}
          >
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <Formik
          initialValues={{
            imageUrl: selectedRow.imageUrl,
            name: selectedRow.name,
            age: selectedRow.age,
            gender: selectedRow.gender,
            experience: selectedRow.experience,
            achievements: selectedRow.achievements,
            monthlyFee: selectedRow.monthlyFee,
            yearlyFee: selectedRow.yearlyFee,
          }}
          validationSchema={EditTrainerValidation}
          onSubmit={(values) => {
            console.log("iam submitted values", values);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("gender", values.gender);
            formData.append("age", values.age);
            formData.append("experience", values.experience);
            formData.append("achievements", values.achievements);
            formData.append("monthlyFee", values.monthlyFee);
            formData.append("yearlyFee", values.yearlyFee);
            formData.append("_id", selectedRow._id);
            console.log("values image", values.imageUrl);
            if (values.imageUrl) {
              formData.append("imageUrl", image);
              mutate(formData);
            } else {
              mutate(formData);
            }
          }}
        >
          {({
            setFieldValue,
            handleSubmit,
            values,
            handleChange,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                <img
                  className="rounded-xl mx-auto object-cover w-1/2"
                  src={image? URL.createObjectURL(image) : selectedRow.imageUrl}
                  alt="Selected"
                />
                  <TextField
                    label="Image"
                    name="imageUrl"
                    type="file"
                    onChange={(e) => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        setFieldValue("imageUrl", e.currentTarget.files[0]);
                        setImage(e.currentTarget.files[0]);
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
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  sx={{ width: "50%", mx: "auto" }}
                >
                  Edit Trainer
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

export default EditTrainerModal;
