import {
  FitnessCenter,
  Group,
  PointOfSale,
  SportsKabaddi,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useState } from "react";
import StatusCount from "./StatusCount";
import dayjs from "dayjs";
import PieChartPayment from "./PieChartPayment";
import RadialBarChart from "./RadialBarChart";
import LineChartSales from "./LineChartSales";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Dashboard = ({ dashboard }) => {
  const [alignment, setAlignment] = useState("monthly");

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const salesInMonthly = [
    {
      id: "Subscription Sales",
      color: "hsl(16, 70%, 50%)",
      data: dashboard.subscriptionMonthlySales,
    },
    {
      id: "Trainer Sales",
      color: "hsl(55, 70%, 50%)",
      data: dashboard.trainerMonthlySales,
    },
  ];
  const salesInYearly = [
    {
      id: "Subscription Sales",
      color: "hsl(16, 70%, 50%)",
      data: dashboard.subscriptionYearlySales,
    },
    {
      id: "Trainer Sales",
      color: "hsl(55, 70%, 50%)",
      data: dashboard.trainerYearlySales,
    },
  ];

  const bookingStats = [
    {
      id: "Subscription Bookings",
      data: [
        {
          x: "Subscription Bookings",
          y: dashboard.bookingStats.subscriptionBookingCount,
        },
      ],
    },
    {
      id: "Trainer Bookings",
      data: [
        {
          x: "Trainer Bookings",
          y: dashboard.bookingStats.trainerBookingCount,
        },
      ],
    },
  ];

  console.log("paymentCountData", dashboard);
  return (
    <div className="p-2">
      <Box
        sx={{
          display: { xs: "flex", md: "grid" },
          gridTemplateColumns: "repeat(4, 1fr)",
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
            title: "Total Users",
            icon: <Group sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: dashboard?.totalUsers,
          }}
        />
        <StatusCount
          {...{
            title: "Gyms",
            icon: <FitnessCenter sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: dashboard?.totalGyms,
          }}
        />
        <StatusCount
          {...{
            title: "Trainers",
            icon: <SportsKabaddi sx={{ color: "#46c7a5", fontSize: "80px" }} />,
            price: dashboard?.totalTrainers,
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
                    alignment === "monthly" ? salesInMonthly : salesInYearly,alignment
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
              Recently added Users
            </Typography>
            <List>
              {dashboard?.recently?.map((user) => (
                <Box key={user._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={user.username}
                        src={user.profilePic.imageUrl}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={`Time Created : ${dayjs(user.createdAt).format(
                        "DD/MM/YYYY hh:mm A"
                      )}`}
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
      <div className="grid sm:grid-cols-12 my-5 px-2">
        {dashboard.paymentCounts && (
          <div className="sm:col-span-6 h-[300px]">
            <h1 className="text-2xl font-serif ">Payment Method</h1>
            <PieChartPayment {...{ payments: dashboard.paymentCounts }} />
          </div>
        )}

        <div className="sm:col-span-6 h-[300px]">
          <h1 className="text-2xl font-serif">Booking Stats</h1>
          <RadialBarChart {...{ data: bookingStats }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-12 my-5">
        <div className="sm:col-span-9 border-r border-opacity-30 border-dotted p-2">
          <Box>
            <Typography sx={{ color: "white" }} variant="h6">
              Recently added Gyms
            </Typography>
            <List>
              {dashboard?.recGym?.map((gym) => (
                <Box key={gym._id}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 64, height: 64 }}
                          alt={gym.gymName}
                          src={gym.images[0].imageUrl}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ ml: 2 }}
                        primary={gym.gymName}
                        secondary={
                          <div>
                            <div className="font-mono font-semibold">
                              {gym.email}.
                            </div>
                            <div className="text-xs">{gym.address}.</div>
                          </div>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        sx={{ textAlign: "right" }}
                        secondary={`Time Created : ${dayjs(
                          gym.createdAt
                        ).format("DD/MM/YYYY hh:mm A")}`}
                      />
                    </ListItem>
                  </Box>
                  <Divider variant="inset" component="li" />
                </Box>
              ))}
            </List>
          </Box>
        </div>
        <div className="sm:col-span-3 p-2">
          <Typography sx={{ color: "white", textAlign: "center" }} variant="h6">
            {" "}
            Recently added Trainers
          </Typography>
          <List>
            {dashboard?.recentlyTrainers?.map((trainer) => (
              <Box key={trainer._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={trainer.name} src={trainer.image.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={trainer.name}
                    secondary={`Time Created : ${dayjs(
                      trainer.createdAt
                    ).format("DD/MM/YYYY hh:mm A")}`}
                  />
                </ListItem>

                <Divider variant="inset" component="li" />
              </Box>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
