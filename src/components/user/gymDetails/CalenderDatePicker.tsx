import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Box, Popper, Paper, ClickAwayListener, Button } from "@mui/material";
import "./datePicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange } from "@/redux/slices/dateRangeSlice"; // Corrected import
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/api/user";
import toast from "react-hot-toast";
import useWindowSize from "@/utils/hooks/useWindowSize";
import { RootState } from "@/redux/store";

const CalenderDatePicker: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  subscriptionType: string;
  gymDetailsData: any;
}> = ({ isOpen, onToggle, subscriptionType, gymDetailsData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uLoggedIn } = useSelector((state: RootState) => state.auth);

  const [dateRange, setDateRangeState] = useState([
    {
      startDate: dayjs().startOf("day").toDate(), // Ensure this is a JavaScript Date object
      endDate: dayjs().startOf("day").toDate(), // Ensure this is a JavaScript Date object
      key: "selection",
    },
  ]);

  const startDate = useSelector((state: RootState) => state.dateRange.startDate);
  const endDate = useSelector((state: RootState) => state.dateRange.endDate);

  const handleSelect = (ranges) => {
    const newDateRange = [
      {
        ...ranges.selection,
        key: "selection",
      },
    ];

    console.log("newdate", newDateRange);

    const startDate = dayjs(newDateRange[0].startDate);
    const endDate = dayjs(newDateRange[0].endDate);

    const obj = {
      startDate,
      endDate,
    };

    setDateRangeState(newDateRange);
    dispatch(setDateRange(obj));
  };

  const { mutate: addCartMutation } = useMutation({
    mutationFn: addToCart,
    onSuccess: (res) => {
      if (res) {
        navigate("/checkout");
      } else {
        toast.error("Something went wrong");
      }
    },
  });
  const handleClickAway = () => {
    if (isOpen) {
      onToggle();
    }
  };

  const handlePurchase = () => {
    if (uLoggedIn) {
      const daysDifference = endDate.diff(startDate, "day");
      const data = {
        gymId: gymDetailsData._id,
        date: startDate,
        expiryDate: endDate,
        subscriptionType: subscriptionType,
        amount: gymDetailsData?.subscriptions.Daily,
        totalPrice:
          daysDifference == 0
            ? gymDetailsData?.subscriptions.Daily
            : gymDetailsData?.subscriptions.Daily * daysDifference,
      };

      addCartMutation(data);
    } else {
      toast.error("Please login first before proceeding");
      navigate("/user-login");
    }
  };
  const { width } = useWindowSize();
  const isLargeScreen = width >= 1024;

  return (
    <>
      {isLargeScreen ? (
        <Box className="block">
          <Popper
            open={true}
            anchorEl={null}
            placement="bottom-start"
            style={{ zIndex: 1000, top: "15%", left: "50%" }}
          >
            <>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                      ranges={dateRange}
                      minDate={dayjs().startOf("day").toDate()}
                      onChange={handleSelect}
                    />
                  </LocalizationProvider>
                  <div className="flex justify-center">
                    <Button
                      onClick={handlePurchase}
                      sx={{
                        my: 1,
                        py: 1,
                        px: 2,
                        color: "white",
                        backgroundColor: "black",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "#4caf50",
                          color: "white",
                        },
                      }}
                    >
                      Purchase
                    </Button>
                  </div>
                </Paper>
              </ClickAwayListener>
            </>
          </Popper>
        </Box>
      ) : (
        <Box className="block">
          <Popper
            open={true}
            anchorEl={null}
            placement="bottom-start"
            style={{
              zIndex: 1000,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
            }}
          >
            <>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                      ranges={dateRange}
                      minDate={dayjs().startOf("day").toDate()}
                      onChange={handleSelect}
                    />
                  </LocalizationProvider>
                  <div className="flex justify-center">
                    <Button
                      onClick={handlePurchase}
                      sx={{
                        my: 1,
                        py: 1,
                        px: 2,
                        color: "white",
                        backgroundColor: "black",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "#4caf50",
                          color: "white",
                        },
                      }}
                    >
                      Purchase
                    </Button>
                  </div>
                </Paper>
              </ClickAwayListener>
            </>
          </Popper>
        </Box>
      )}
    </>
  );
};

export default CalenderDatePicker;
