import Navbar from "@/components/common/Navbar";
import { Close, ContentPasteOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Slide,
  SlideProps,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import dayjs from "dayjs";
import React, { forwardRef } from "react";
import toast from "react-hot-toast";
import Transition from "./Transition.tsx";

const Coupon = ({ handleShowCoupon, showCoupon, coupons }) => {
  const handleCopyCouponCode = (val) => {
    navigator.clipboard.writeText(val);
    toast.success("Coupon Copied");
    handleShowCoupon();
  };
  return (
    <>
      <Navbar />
      <div>
        <Dialog
          fullWidth
          maxWidth="xs"
          open={showCoupon}
          TransitionComponent={Transition}
        >
          <Container>
            <Toolbar sx={{ paddingTop: 2, paddingBotton: 2 }}>
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Typography variant="h6">Explore Coupons</Typography>
                <Typography variant="subtitle2">Select Coupons</Typography>
              </div>
              <IconButton onClick={handleShowCoupon} color="inherit">
                <Close />
              </IconButton>
            </Toolbar>
            <Divider sx={{ width: "100%", height: 1, bgcolor: "#777" }} />
            <br />

            {coupons.length===0?(
                <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  boxShadow: 3,
                  padding: 4,
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" color="primary" gutterBottom>
                  No Coupons Available
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Currently, there are no coupons available at the gym.
                  Please check back later for exciting offers!
                </Typography>
              </Box>

            ): coupons.map((coupon) => (
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1.5px solid black",
                  borderRadius: 1.5,
                }}
              >
                <Typography variant="subtitle1">
                  {" "}
                  <span className="border-dashed border bg-yellow-600 shadow-lg text-white px-2 py-1 rounded-l">
                    {coupon.name}
                  </span>
                </Typography>
                <Typography variant="h6">{coupon.description}</Typography>
                <Typography variant="subtitle2">
                  Valid Till: {dayjs(coupon.endingDate).format("DD-MM-YYYY")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title={coupon.name}>
                    <Button
                      sx={{
                        bgcolor: "black",
                        transition: "color border bgColor 0.3s ease",
                        "&:hover": {
                          bgcolor: "#ffffff",
                          color: "#000000",
                          border: "1px solid black",
                        },
                      }}
                      variant="contained"
                      endIcon={<ContentPasteOutlined />}
                      onClick={() => handleCopyCouponCode(coupon.name)}
                    >
                      Copy Code
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            ))}
          </Container>
        </Dialog>
      </div>
    </>
  );
};

export default Coupon;
