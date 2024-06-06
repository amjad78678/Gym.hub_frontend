import React, { useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@tanstack/react-query";
import { editGymSubscription } from "@/api/gym";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

interface iType {
  clickHandle: () => void;
  subscription: string[] | null;
  setSubscription: (value: string[]) => void;
  refetch: () => void;
}
const ModalSubscriptionEdit: React.FC<iType> = ({
  clickHandle,
  subscription,
  setSubscription,
  refetch,
}) => {
  console.log("iam subscriptionman", subscription);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    console.log("iamid", id);

    if (id === "subscription") {
      if (subscription) {
        setSubscription([value, subscription[1]]);
      }
    } else if (id === "amount") {
      if (subscription) {
        setSubscription([subscription[0], value]);
      }
    }
  };

  const { isPending, mutate: editSubscriptionMutation } = useMutation({
    mutationFn: editGymSubscription,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        clickHandle();
        refetch();
      }
    },
  });

  const submitHandler = () => {
    const data = {
      subscription: subscription ? subscription[0] : null,
      amount: subscription ? subscription[1] : null,
    };

    editSubscriptionMutation(data);
  };

  useEffect(() => {
    console.log("subscro", subscription);
  }, [subscription]);

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog
        // fullScreen
        open={true}
        onClose={clickHandle}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          Edit Subscription{" "}
          <IconButton onClick={clickHandle} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              value={subscription?.[0]}
              label="Subscription"
            ></TextField>
            <TextField
              variant="outlined"
              onChange={inputHandler}
              id="amount"
              value={subscription?.[1]}
              label="Amount"
            ></TextField>

            <Button
              className="relative"
              disabled={isPending}
              onClick={submitHandler}
              color="primary"
              variant="contained"
            >
              <span>{isPending ? "Updating..." : "Update"}</span>
              {isPending && (
                <span className="absolute right-4">
                  <BeatLoader />
                </span>
              )}
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalSubscriptionEdit;
