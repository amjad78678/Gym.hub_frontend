import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = localStorage.getItem("userDetails");
const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
const storedGymDetails = localStorage.getItem("gymDetails");
const parsedGymDetails = storedGymDetails ? JSON.parse(storedGymDetails) : null;
const storedTrainerDetails = localStorage.getItem("trainerDetails");
const parsedTrainerDetails = storedTrainerDetails
  ? JSON.parse(storedTrainerDetails)
  : null;

const authSlice = createSlice({
  initialState: {
    uLoggedIn: localStorage.getItem("uLoggedIn") ? true : false,
    userDetails: parsedUserInfo,
    gLoggedIn: localStorage.getItem("gLoggedIn") ? true : false,
    gymDetails: parsedGymDetails,
    tLoggedIn: localStorage.getItem("tLoggedIn") ? true : false,
    trainerDetails: parsedTrainerDetails,
    aLoggedIn: localStorage.getItem("aLoggedIn") ? true : false,
  },
  name: "auth",
  reducers: {
    setUserLogin: (state) => {
      state.uLoggedIn = true;
      localStorage.setItem("uLoggedIn", "true");
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    setUserLogout: (state) => {
      (state.uLoggedIn = false), (state.userDetails = null);
      localStorage.removeItem("uLoggedIn");
      localStorage.removeItem("userDetails");
    },
    setGymLogin: (state, action) => {
      state.gLoggedIn = true;
      localStorage.setItem("gLoggedIn", "true");
      state.gymDetails = action.payload;
      localStorage.setItem("gymDetails", JSON.stringify(action.payload));
    },
    setGymLogout: (state) => {
      state.gLoggedIn = false;
      localStorage.removeItem("gLoggedIn");
      state.gymDetails = null;
      localStorage.removeItem("gymDetails");
    },
    setAdminLogin: (state) => {
      state.aLoggedIn = true;
      localStorage.setItem("aLoggedIn", "true");
    },
    setAdminLogout: (state) => {
      state.aLoggedIn = false;
      localStorage.removeItem("aLoggedIn");
    },
    setTrainerLogin: (state, action) => {
      state.tLoggedIn = true;
      localStorage.setItem("tLoggedIn", "true");
      state.trainerDetails = action.payload;
      localStorage.setItem("trainerDetails", JSON.stringify(action.payload));
    },
    setTrainerLogout: (state) => {
      state.tLoggedIn = false;
      localStorage.removeItem("tLoggedIn");
      state.gymDetails = null;
      localStorage.removeItem("trainerDetails");
    },
  },
});

export const {
  setUserLogin,
  setUserLogout,
  setUserDetails,
  setAdminLogin,
  setAdminLogout,
  setGymLogin,
  setGymLogout,
  setTrainerLogin,
  setTrainerLogout,
} = authSlice.actions;
export default authSlice.reducer;
