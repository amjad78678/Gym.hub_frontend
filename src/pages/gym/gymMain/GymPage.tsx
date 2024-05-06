import React, { useMemo } from "react";
import Navbar from "@/components/gym/common/Navbar";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';


const GymPage = () => {
  const darkTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: "dark",
      },
    });
  }, []);
  return (
    <div className="bg-black">
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </div>
  );
};

export default GymPage;
