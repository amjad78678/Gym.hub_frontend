import { addMoneyWallet } from "@/api/user";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Modal, 
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
import toast from "react-hot-toast";

const AddMoneyModal = ({
  addMoneyOpen,
  setAddMoneyOpen,
  handleCloseModalAddMoney,
  refetch,
}) => {
  const [amount, setAmount] = useState(100);

  const { mutate: addMoneyMutate } = useMutation({ 
    mutationFn: addMoneyWallet,
    onSuccess: async (res) => {
      if (res) {
        const stripe = await loadStripe(STRIPE_PK);

        if (res.data && stripe) {
          const result = await stripe.redirectToCheckout({
            sessionId: res.data.stripeId,
          });

          if (result.error) {
            const msg = result.error;
            console.log(msg);
          }
        }
        toast.success(res.data.message);
        refetch();
        handleCloseModalAddMoney();
      }
    },
  });

  const handleAddMoney = () => {
    const obj = {
      wallet: amount,
      walletHistory: {
        date: Date.now(),
        amount: amount,
        description: "Deposited money via stripe",
        type: "credit",
      },
    };

    addMoneyMutate(obj);
  };

  return (
    <Modal
      open={addMoneyOpen}
      onClose={handleCloseModalAddMoney}
      aria-labelledby="add-money-modal"
      aria-describedby="add-money-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "4px",
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography variant="body1" fontWeight={"bold"} pb={2} id="modal-title">
          Add Money to Wallet
        </Typography>
        <TextField
          fullWidth
          label="Amount"
          type="number"
          onFocus={(e) =>
            e.target.addEventListener(
              "wheel",
              function (e) {
                e.preventDefault();
              },
              { passive: false }
            )
          }
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        {amount > 20000 && (
          <Typography variant="caption" color="error">
            Maximum amount limit reached (₹20,000).
          </Typography>
        )}
        {amount < 100 && (
          <Typography variant="caption" color="error">
            Minimum amount is ₹100.
          </Typography>
        )}
        <Stack
          direction="row"
          width={"100%"}
          spacing={0.5}
          paddingBottom={2}
          paddingTop={2}
        >
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              p: 1,
              borderRadius: 0,
              bgcolor: "",
              color: "#DC3545",
              border: "1px solid #DC3545",
              transition: "background-color 0.5s, color 0.5s",
              "&:hover": {
                bgcolor: "#DC3545",
                color: "white",
                border: "none",
              },
            }}
            onClick={handleCloseModalAddMoney}
          >
            <span>Cancel</span>
          </Button>
          <Button
            className="book_room_btn"
            sx={{ width: "100%", p: 1, borderRadius: 0 }}
            color="inherit"
            variant="outlined"
            onClick={handleAddMoney}
            disabled={
              amount <= 0 || amount > 20000 || amount < 100 || isNaN(amount)
            }
          >
            <span>Add Money</span>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddMoneyModal;
