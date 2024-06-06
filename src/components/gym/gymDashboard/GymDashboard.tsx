import { RootState } from "@/redux/store";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
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
import { MouseEvent, useState } from "react";

const GymDashboard = ({ gym, dashboard }) => {
  const divStyle = {
    backgroundImage: `url("${gym[0].images[0].imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [alignment, setAlignment] = useState("monthly");
  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const salesInMonthly = [
    {
      id: "Subscription Purchased",
      color: "hsl(271, 37%, 47%)",
      data: dashboard.monthlySales,
    },
  ];
  const salesInYearly = [
    {
      id: "Subscription Purchased",
      color: "hsl(271, 37%, 47%)",
      data: dashboard.yearlySales,
    },
  ];

  console.log("dashboard in dashboard", dashboard);
  return (
    dashboard && (
      <div className="">
        <div style={divStyle} className="h-40 lg:h-52 relative">
          <Container>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="flex justify-start items-center">
              <div className="z-10 my-20">
                <h1
                  className="text-white text-3xl xs:text-5xl sm:text-6xl md:text-7xl font-semibold whitespace-normal max-w-screen-sm font-serif"
                  style={{ textShadow: "1px 1px 1px #000000" }}
                >
                  {gym[0].gymName}
                </h1>
              </div>
            </div>
          </Container>
        </div>
        <Container>
          <div>
            <div className="grid sm:grid-cols-12 py-4 ">
              <div className="sm:col-span-9 text-white p-2  border-b  sm:border-b-0 border-dotted border-gray-400">
                <h1 className=" text-3xl font-serif">Sales Statistics</h1>
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
                          alignment === "monthly"
                            ? salesInMonthly
                            : salesInYearly,
                        alignment,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3 p-2 overflow-y-scroll no-scrollbar ">
                <Box>
                  <Box
                    sx={{
                      display: { xs: "flex" },
                      gridAutoRows: "minmax(100px, auto)",
                      gap: 2,
                      textAlign: "center",
                      flexDirection: "column",
                      color: "white",
                    }}
                  >
                    <StatusCount
                      {...{
                        title: "Total Sales",
                        icon: (
                          <PointOfSale
                            sx={{ color: "#46c7a5", fontSize: "80px" }}
                          />
                        ),
                        price: `₹${dashboard?.totalSales}`,
                      }}
                    />
                    <StatusCount
                      {...{
                        title: "Users",
                        icon: (
                          <Group sx={{ color: "#46c7a5", fontSize: "80px" }} />
                        ),
                        price: dashboard?.totalUsers,
                      }}
                    />
                  </Box>
                </Box>
                <Divider sx={{ my: 2, opacity: 0.7 }} />
              </div>
            </div>

            <div className="p-2 overflow-y-scroll no-scrollbar w-2/3 mx-auto">
              <Box>
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "cursive",
                  }}
                  variant="h5"
                >
                  Recently booked Users
                </Typography>
                <List>
                  {dashboard?.recentlyBookedMemberships?.map((user) => (
                    <Box key={user._id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar alt={user.username} src={user.profilePic} />
                        </ListItemAvatar>

                        <ListItemText
                          sx={{ color: "white" }}
                          primary={user.username}
                          secondary={`Time Created : ${dayjs(
                            user.date
                          ).fromNow()}`}
                        />
                        <p className="text-white">
                          Subscription Type : {user.subscriptionType}
                        </p>

                        <Divider variant="inset" component="li" />
                      </ListItem>
                    </Box>
                  ))}
                </List>
              </Box>
              <Divider sx={{ my: 2, opacity: 0.7 }} />
            </div>
          </div>
        </Container>
      </div>
    )
  );
};

export default GymDashboard;
