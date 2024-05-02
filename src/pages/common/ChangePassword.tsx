import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { updatePassword } from "@/api/user";
import { gUpdatePassword } from "@/api/gym";

const ChangePassword = ({ userType, closeModal }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const { mutate: updataPasswordMutation } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (res) => {
      if (res) {
        toast.success("Password updated successfully");
        closeModal();
      }
    },
  });
  const { mutate: gUpdataPasswordMutation } = useMutation({
    mutationFn: gUpdatePassword,
    onSuccess: (res) => {
      if (res) {
        toast.success("Password updated successfully");
        closeModal();
      }
    },
  });

  const submitHandler = () => {
    if (formData.password === formData.confirmPassword) {
      if (userType === "user") {
        updataPasswordMutation(formData.password);
      } else if (userType === "gym") {
        gUpdataPasswordMutation(formData.password);
      }
    } else {
      toast.error("Password does not match");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={true} onClose={closeModal} fullWidth maxWidth="xs">
        <DialogTitle>
          Edit Subscription{" "}
          <IconButton onClick={closeModal} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              type="password"
              onChange={inputHandler}
              id="password"
              label="Password"
              required
            ></TextField>
            <TextField
              variant="outlined"
              type="password"
              onChange={inputHandler}
              id="confirmPassword"
              label="Confirm Password"
              required
            ></TextField>
            <Button onClick={submitHandler} color="primary" variant="contained">
              Submit
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
            <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
