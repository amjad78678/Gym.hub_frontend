import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const GymTrainer = () => {



  return (
    <div>
      <Box
        sx={{
          height: "600",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
          }}
        >
          Manage Trainers
        </Typography>
{/* 
        <DataGrid columns={} rows={} /> */}
      </Box>
    </div>
  );
};

export default GymTrainer;
