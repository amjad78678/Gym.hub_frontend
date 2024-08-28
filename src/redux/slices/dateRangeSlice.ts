import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState: {
    startDate: dayjs().toISOString(),
    endDate: dayjs().toISOString(),
  },
  reducers: {
    setDateRange: (state, action) => {
      state.startDate = dayjs(action.payload.startDate).toISOString();
      state.endDate = dayjs(action.payload.endDate).toISOString();
    },
  },
});

export const { setDateRange } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
