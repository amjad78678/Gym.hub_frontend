import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  TextField,
  Box,
  Popper,
  Paper,
  ClickAwayListener,
  Button,
} from "@mui/material";
import "./datePicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange } from "@/redux/slices/dateRangeSlice"; // Corrected import

const CalenderDatePicker: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
}> = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();

  const [dateRange, setDateRangeState] = useState([
    {
      startDate: dayjs().startOf("day").toDate(), // Ensure this is a JavaScript Date object
      endDate: dayjs().startOf("day").toDate(), // Ensure this is a JavaScript Date object
      key: "selection",
    },
  ]);

  const startDate = useSelector((state) => state.dateRange.startDate);
  const endDate = useSelector((state) => state.dateRange.endDate);

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

  const handleClickAway = () => {
    if (isOpen) {
      onToggle();
    }
  };

  const handlePurchase = () => {
    
     const data = {
      
     }
  }

  return (
    <Box
      display="flex"
      sx={{
        "@media (max-width: 976px)": {
          marginTop: "0px",
          marginLeft: "0px",
          mr: "0%",
        },
      }}
    >


      <Popper
        open={true}
        anchorEl={null}
        placement="bottom-start"
        style={{ zIndex: 1000, top: "15%", left: "50%" }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <>
            <Paper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  ranges={dateRange}
                  minDate={dayjs().startOf("day").toDate()}
                  onChange={handleSelect}
                />
              <Button onClick={onToggle}>x</Button>

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
                    "&:hover": { backgroundColor: "#4caf50", color: "white" },
                  }}
                >
                  Purchase
                </Button>
              </div>
            </Paper>
          </>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default CalenderDatePicker;
