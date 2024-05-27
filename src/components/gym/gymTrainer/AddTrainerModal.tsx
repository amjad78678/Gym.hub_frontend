import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AddTrainerValidation } from "@/validation/AddTrainerValidation";
import { useMutation } from "@tanstack/react-query";
import { addBanner } from "@/api/admin";

const AddBannerModal = ({ open, setOpen }) => {
  const [image, setImage] = useState<File | null>(null);

  const { status, mutate } = useMutation({
    mutationFn: addBanner,
    onSuccess: (res) => {
      if (res) {
        console.log('i have response');
      }
    }
  });

  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle>
          ADD BANNER
          <IconButton onClick={() => setOpen(false)} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>

        <Formik
          initialValues={{
            bannerImage: null,
            title: "",
            description: "",
          }}
          validationSchema={AddTrainerValidation}
          onSubmit={(values, { setSubmitting }) => {
            console.log('values',values)
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("bannerImage", image);

            mutate(formData);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form>
              <DialogContent>
                <Stack spacing={2} margin={2}>
                  {values.bannerImage && (
                    <img
                      className="rounded-xl mx-auto mb-2 object-cover w-full"
                      src={URL.createObjectURL(values.bannerImage)}
                      alt="Selected"
                    />
                  )}
                  <TextField
                    label="Image"
                    name="bannerImage"
                    type="file"
                    onChange={(e) => {
                      if (e.currentTarget.files && e.currentTarget.files[0]) {
                        setFieldValue("bannerImage", e.currentTarget.files[0]);
                        setImage(e.currentTarget.files[0]);
                      }
                    }}
                    variant="outlined"
                    error={Boolean(errors.bannerImage && touched.bannerImage)}
                    helperText={touched.bannerImage && errors.bannerImage}
                  />
                  <ErrorMessage
                    name="bannerImage"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    label="Title"
                    name="title"
                    variant="outlined"
                    error={Boolean(errors.title && touched.title)}
                    helperText={touched.title && errors.title}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    variant="outlined"
                    error={Boolean(errors.description && touched.description)}
                    helperText={touched.description && errors.description}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{ width: "50%", mx: "auto" }}
                >
                  ADD BANNER
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddBannerModal;
