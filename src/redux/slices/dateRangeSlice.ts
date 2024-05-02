import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    startDate: dayjs(), 
    endDate: dayjs(),
  },
  reducers: {
    setDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});


export const { setDateRange } = dateRangeSlice.actions; 


export default dateRangeSlice.reducer;
