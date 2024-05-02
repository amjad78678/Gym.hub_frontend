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
} from "@mui/material";
import "./datePicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
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

  const startDate = useSelector((state) => dayjs(state.dateRange.startDate));
  const endDate = useSelector((state) => dayjs(state.dateRange.endDate));

  useEffect(() => {
    // This effect runs when the component mounts and whenever startDate or endDate changes
    // You can use this to update your local state if needed
  }, [startDate, endDate]);

  const handleSelect = (ranges) => {
    const newDateRange = [
      {
        ...ranges.selection,
        key: "selection",
      },
    ];

    console.log("iamnew date range", newDateRange);

    setDateRangeState(newDateRange); // Update local state
    dispatch(setDateRange(newDateRange)); // Dispatch the action to update Redux store
  };

  const handleClickAway = () => {
    if (isOpen) {
      onToggle();
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        ml: 25,
        "@media (max-width: 976px)": {
          marginTop: "0px",
          marginLeft: "0px",
          mr: "0%",
        },
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        sx={{ width: 200, mt: 2, position: "relative" }}
        label="Select Date"
        onClick={onToggle}
        contentEditable={false}
        value={`${startDate.format("YYYY-MM-DD")} ────── ${endDate.format(
          "YYYY-MM-DD"
        )}`}
      />

      <Popper
        open={true}
        anchorEl={null}
        placement="bottom-start"
        style={{ zIndex: 1000, top: "15%", left: "5%" }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                ranges={dateRange}
                minDate={dayjs().startOf("day").toDate()}
                onChange={handleSelect}
              />
            </LocalizationProvider>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default CalenderDatePicker;
