import LineChartSales from "@/components/admin/adminDashboard/LineChartSales";
import StatusCount from "@/components/admin/adminDashboard/StatusCount";
import { Group, PointOfSale } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  List, 
  ListItem,
  ListItemAvatar,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React, { MouseEvent, useState } from "react";

const TrainerDashboard = ({ dashboard }) => {
  console.log("dashboard......", dashboard);
  const [alignment, setAlignment] = useState("monthly");
  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const salesInMonthly = [
    {
      id: "Service Booked",
      color: "hsl(271, 37%, 47%)",
      data: dashboard.trainerMonthlySales,
    },
  ];
  const salesInYearly = [
    {
      id: "Service Booked",
      color: "hsl(271, 37%, 47%)",
      data: dashboard.trainerYearlySales,
    },
  ];

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
            price: `₹${dashboard?.totalSales}`,
          }}
        />
        <StatusCount
          {...{
            title: "Trainees",
            icon: <Group sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: dashboard?.totalTrainees,
          }}
        />
        <StatusCount
          {...{
            title: "Total Bookings",
            icon: <Group sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: dashboard?.totalBookings,
          }}
        />
      </Box>

      <div className="grid sm:grid-cols-12 my-5 ">
        <div className="sm:col-span-9 text-white p-2  border-b sm:border-r sm:border-b-0 border-dotted border-gray-400">
          <h1 className=" text-2xl font-serif">Sales Statistics</h1>
          <div className="relative">
            <div className="absolute top-0 right-28 z-10">
              <ToggleButtonGroup
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="monthly">Monthly</ToggleButton>
                <ToggleButton value="yearly">Yearly</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="h-[400px]">
              <LineChartSales
                {...{
                  data:
                    alignment === "monthly" ? salesInMonthly : salesInYearly,
                  alignment,
                }}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-3 p-2 overflow-y-scroll no-scrollbar ">
          <Box>
            <Typography
              sx={{ color: "white", textAlign: "center" }}
              variant="h6"
            >
              Recently joined Trainees
            </Typography>
            <List>
              {dashboard?.recentlyJoinedTrainees?.map((user) => (
                <Box key={user._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={user.username} src={user.profilePic} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={`Time Created : ${dayjs(
                        user.bookingDate
                      ).fromNow()}`}
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </Box>
              ))}
            </List>
          </Box>
          <Divider sx={{ my: 2, opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
