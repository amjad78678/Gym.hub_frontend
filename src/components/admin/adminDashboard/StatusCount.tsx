import { GroupAddOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const StatusCount = ({ title, icon,price }) => {
  return (
    <Box width="100%" sx={{ p: 2, backgroundColor: "#1b2537" }}>
      <Typography sx={{ color: "white" }} variant="h4">
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "100%" }}>
          {icon}
          <Typography sx={{ marginTop: "15px",textAlign: "center",marginRight: "10px" }} variant="h4">
           {price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatusCount;
