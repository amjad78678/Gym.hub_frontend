import StatusCount from "@/components/admin/adminDashboard/StatusCount";
import { Group, PointOfSale } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";

const TrainerDashboard = () => {


  
  return (
    <div className="p-2">
      <Box
        sx={{
          display: { xs: "flex", md: "grid" },
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "minmax(100px, auto)",
          gap: 2,
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <StatusCount
          {...{
            title: "Total Sales",
            icon: <PointOfSale sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: `₹4555`,
          }}
        />
        <StatusCount
          {...{
            title: "Total Users",
            icon: <Group sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: 34566,
          }}
        />
        <StatusCount
          {...{
            title: "Total Users",
            icon: <Group sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: 34566,
          }}
        />
      </Box>
    </div>
  );
};

export default TrainerDashboard;
