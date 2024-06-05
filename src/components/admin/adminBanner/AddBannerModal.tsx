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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import { addBanner, updateBanner } from "@/api/admin";
import { AddBannerValidation } from "@/validation/AddBannerValidation";
import toast from "react-hot-toast";
import { EditBannerValidation } from "@/validation/EditBannerValidation";
import { BeatLoader } from "react-spinners";

const AddBannerModal = ({ open, setOpen, refetch, modalType, selected }) => {
  console.log("iam selected...............", selected);
  const [image, setImage] = useState<File | null>(null);
  const { isPending: isPendingAdd, mutate } = useMutation({
    mutationFn: addBanner,
    onSuccess: (res) => {
      if (res) {
        if (res.data.success) {
          setOpen(false);
          toast.success(res.data.message);
          refetch();
        }
      }
    },
  });

  const { isPending: isPendingEdit, mutate: editBannerMutate } = useMutation({
    mutationFn: updateBanner,
    onSuccess: (res) => {
      if (res) {
        if (res?.data.success) {
          toast.success(res?.data.message);
          setOpen(false);
          refetch();
        }
      }
    },
  });

  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle>
          {modalType === "add" ? "ADD BANNER" : "EDIT BANNER"}
          <IconButton onClick={() => setOpen(false)} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        {modalType === "add" ? (
          <Formik
            initialValues={{
              bannerImage: null,
              title: "",
              description: "",
            }}
            validationSchema={AddBannerValidation}
            onSubmit={(values, { setSubmitting }) => {
              console.log("valuesany", values);
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("bannerImage", image);

              mutate(formData);
              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              setFieldValue,
              values,
              errors,
              touched,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
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
                          setFieldValue(
                            "bannerImage",
                            e.currentTarget.files[0]
                          );
                          setImage(e.currentTarget.files[0]);
                        }
                      }}
                      variant="outlined"
                      error={Boolean(errors.bannerImage && touched.bannerImage)}
                      helperText={touched.bannerImage && errors.bannerImage}
                    />

                    <Field
                      as={TextField}
                      label="Title"
                      name="title"
                      variant="outlined"
                      error={Boolean(errors.title && touched.title)}
                      helperText={touched.title && errors.title}
                    />

                    <Field
                      as={TextField}
                      label="Description"
                      name="description"
                      variant="outlined"
                      error={Boolean(errors.description && touched.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isPendingAdd}
                    sx={{ width: "50%", mx: "auto" }}
                  >
                    ADD BANNER
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{
              bannerImage: null,
              title: selected.title,
              description: selected.description,
            }}
            validationSchema={EditBannerValidation}
            onSubmit={(values, { setSubmitting }) => {
              console.log("valuesany", values);
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("bannerImage", image);
              formData.append("id", selected._id);

              editBannerMutate(formData);
              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              setFieldValue,
              values,
              errors,
              touched,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <DialogContent>
                  <Stack spacing={2} margin={2}>
                    <img
                      className="rounded-xl mx-auto mb-2 object-cover w-full"
                      src={
                        values.bannerImage
                          ? URL.createObjectURL(values.bannerImage)
                          : selected.bannerImage.imageUrl
                      }
                      alt="Selected"
                    />

                    <TextField
                      label="Image"
                      name="bannerImage"
                      type="file"
                      onChange={(e) => {
                        if (e.currentTarget.files && e.currentTarget.files[0]) {
                          setFieldValue(
                            "bannerImage",
                            e.currentTarget.files[0]
                          );
                          setImage(e.currentTarget.files[0]);
                        }
                      }}
                      variant="outlined"
                      error={Boolean(errors.bannerImage && touched.bannerImage)}
                      helperText={touched.bannerImage && errors.bannerImage}
                    />

                    <Field
                      as={TextField}
                      label="Title"
                      name="title"
                      variant="outlined"
                      error={Boolean(errors.title && touched.title)}
                      helperText={touched.title && errors.title}
                    />

                    <Field
                      as={TextField}
                      label="Description"
                      name="description"
                      variant="outlined"
                      error={Boolean(errors.description && touched.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Stack>
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isPendingEdit}
                    sx={{ width: "50%", mx: "auto", position: "relative" }}
                  >
                    <span>
                      {isPendingEdit ? "Updating..." : "Update Banner"}
                    </span>
                    {isPendingEdit && (
                   <CircularProgress size={20} className="absolute right-4" />
                    )}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        )}
      </Dialog>
    </div>
  );
};

export default AddBannerModal;
