import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  initialState: {
    lat: 0,
    long: 0,
    details: {
      gymName: "",
      email: "",
      contactNumber: "",
      state: "",
      city: "",
      pincode: "",
      businessId: "",
      dailyFee: "",
      monthlyFee: "",
      yearlyFee: "",
      description: "",
      password: "",
      confirmPassword: "",
    },
    images: [],
    navPage: "home",
  },
  name: "app",
  reducers: {
    setLatitude: (state, action) => {
      state.lat = action.payload;
    },
    setLongitude: (state, action) => {
      state.long = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setNavPage: (state, action) => {
      state.navPage = action.payload;
    },
  },
});

export const { setLatitude, setLongitude, setDetails, setImages,setNavPage } =
  appSlice.actions;
export default appSlice.reducer;
