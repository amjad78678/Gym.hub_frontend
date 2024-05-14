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

const Transition = forwardRef<HTMLDivElement, SlideProps>((props, ref) => {
  const transitionSpeed = 500;

  return (
    <Slide
      direction="down"
      {...props}
      ref={ref}
      timeout={{ enter: transitionSpeed, exit: transitionSpeed }}
    />
  );
});

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

            {coupons.map((coupon) => (
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
                  <Tooltip title="AMJAS">
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
