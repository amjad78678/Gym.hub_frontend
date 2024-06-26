import Navbar from "@/components/common/Navbar";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentFailure: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white">
      <Navbar {...{ fixed: true }} />
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            display="flex"
            paddingBottom={2}
          >
            Payment Failed!
          </Typography>

          <img
            src="https://cdn.dribbble.com/users/107759/screenshots/4594246/15_payment-error.gif"
            style={{
              borderRadius: "15px",
              width: "100%",
              maxWidth: "350px",
              height: "auto",
            }}
            alt="Payment Success..."
          />
        </Box>
        <Stack
          direction="row"
          width="100%"
          spacing={2}
          justifyContent="center"
          paddingTop={4}
          paddingBottom={2}
        >
          {location.pathname === "/cancel/checkout" && (
            <>
              <Button
                variant="outlined"
                className="book_room_btn"
                sx={{ width: "20%", p: 1, borderRadius: 0 }}
                color="inherit"
                onClick={() => navigate(`/book-gym`)}
              >
                <span>Book Gyms</span>
              </Button>
              <Button
                variant="outlined"
                className="book_room_btn"
                sx={{ width: "20%", p: 1, borderRadius: 0 }}
                color="inherit"
                onClick={() => navigate(`/`)}
              >
                <span>Back to home</span>
              </Button>
            </>
          )}

          {location.pathname === "/cancel/book_trainer" && (
            <>
            <Button
              variant="outlined"
              className="book_room_btn"
              sx={{ width: "20%", p: 1, borderRadius: 0 }}
              color="inherit"
              onClick={() => navigate(`/personal-trainer`)}
            >
              <span>Book Trainer</span>
            </Button>
            <Button
              variant="outlined"
              className="book_room_btn"
              sx={{ width: "20%", p: 1, borderRadius: 0 }}
              color="inherit"
              onClick={() => navigate(`/`)}
            >
              <span>Back to home</span>
            </Button>
          </>
          )}

          {
            location.pathname === "/cancel/add_money" && (
              <Button
              variant="outlined"
              className="book_room_btn"
              sx={{ width: "20%", p: 1, borderRadius: 0 }}
              color="inherit"
              onClick={() => navigate(`/profile/subscriptions`)}
            >
              <span>Back to profile</span>
            </Button>
            )
          }
        </Stack>
      </Container>
    </div>
  );
};

export default PaymentFailure;
