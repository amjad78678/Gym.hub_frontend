import Navbar from "@/components/common/Navbar";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location= useLocation();
  return (
    <div className="bg-black text-white">
      <Navbar />
      
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            display="flex"
            color="white"
            paddingBottom={2}
          >
            Payment Success!
          </Typography>

          <img
            src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/media/1cbd3594bb5e8d90924a105d4aae924c.gif"
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

          {location.pathname === "/success/checkout" && (
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
            onClick={() => navigate(`/profile/subscriptions`)}
          >
            <span>My Bookings</span>
          </Button>
            
            </>
          )}


          {location.pathname === "/success/book_trainer" && (
            
            <>
               <Button
            variant="outlined"
            className="book_room_btn"
            sx={{ width: "20%", p: 1, borderRadius: 0 }}
            color="inherit"
            onClick={() => navigate(`/personal-trainer`)}
          >
            <span>Book Trainers</span>
          </Button>
          <Button
            variant="outlined"
            className="book_room_btn"
            sx={{ width: "20%", p: 1, borderRadius: 0 }}
            color="inherit"
            onClick={() => navigate(`/profile/trainers`)} 
          >
            <span>My Trainers</span>
          </Button>
            
            </>
          )}
       
        </Stack>
      </Container>
    </div>
  );
};

export default PaymentSuccess;
