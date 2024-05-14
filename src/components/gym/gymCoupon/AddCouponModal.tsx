import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { addCoupon } from "@/api/gym";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "@/components/common/Loader";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { AddCouponValidation } from "@/validation/AddCouponValidation";
import dayjs from "dayjs";

const AddCouponModal = ({ open, setOpen, refetch }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      discount: "",
      minPrice: "",
      startingDate: "",
      endingDate: "",
    },
    validationSchema: AddCouponValidation,
    onSubmit: (values) => {
      console.log("iam values from formik", values);
      mutate(values);
    },
  });

  const { status: mutStatus, mutate } = useMutation({
    mutationFn: addCoupon,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        refetch();
        setOpen(false);
      }
    },
  });
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Add Coupon{" "}
          <IconButton onClick={() => setOpen(false)} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                label="Name"
                name="name"
                value={formik.values.name.toUpperCase()}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="outlined"
              />
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                variant="outlined"
              />

              <Stack spacing={2} alignItems="center">
                <TextField
                  label="Discount"
                  sx={{ width: "100%" }}
                  name="discount"
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.discount && Boolean(formik.errors.discount)
                  }
                  helperText={formik.touched.discount && formik.errors.discount}
                  variant="outlined"
                />

                <TextField
                  sx={{ width: "100%" }}
                  label="Min. Price"
                  name="minPrice"
                  value={formik.values.minPrice}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.minPrice && Boolean(formik.errors.minPrice)
                  }
                  helperText={formik.touched.minPrice && formik.errors.minPrice}
                  variant="outlined"
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={dayjs(formik.values.startingDate)}
                    minDate={today}
                    onChange={(newValue) => {
                      formik.setFieldValue("startingDate", newValue);
                    }}
                    slotProps={{
                      textField: {
                        error:
                          formik.touched.startingDate &&
                          Boolean(formik.errors.startingDate),
                        helperText:
                          formik.touched.startingDate && formik.errors.startingDate,
                      },
                    }}
                  />
                  <DatePicker
                    label="End Date"
                    value={dayjs(formik.values.endingDate)}
                    minDate={tomorrow}
                    onChange={(newValue) => {
                      formik.setFieldValue("endingDate", newValue);
                    }}
                    slotProps={{
                      textField: {
                        helperText:
                          formik.touched.endingDate && formik.errors.endingDate,
                        error:
                          formik.touched.endingDate &&
                          Boolean(formik.errors.endingDate),
                      },
                    }}
                  />
                </LocalizationProvider>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              type="submit"
              sx={{ width: "50%", mx: "auto" }}
            >
              Add Coupon
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {mutStatus === "pending" && <Loader />}
    </div>
  );
};

export default AddCouponModal;
