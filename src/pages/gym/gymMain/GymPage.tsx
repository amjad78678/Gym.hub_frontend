import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import GymNavbar from "@/components/gym/common/GymNavbar";


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
        <Outlet />
      </ThemeProvider>
    </div>
  );
};

export default GymPage;
