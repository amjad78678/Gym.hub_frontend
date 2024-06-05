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
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import StatusCount from "./StatusCount";
import dayjs from "dayjs";
import StreamChart from "./StreamChart";

const Dashboard = ({ dashboard }) => {
  const dummy = [
    {
      Raoul: 68,
      Josiane: 115,
      Marcel: 18,
      René: 68,
      Paul: 136,
      Jacques: 59,
    },
    {
      Raoul: 79,
      Josiane: 106,
      Marcel: 155,
      René: 51,
      Paul: 21,
      Jacques: 69,
    },
    {
      Raoul: 61,
      Josiane: 62,
      Marcel: 172,
      René: 97,
      Paul: 92,
      Jacques: 87,
    },
    {
      Raoul: 82,
      Josiane: 39,
      Marcel: 132,
      René: 134,
      Paul: 119,
      Jacques: 139,
    },
    {
      Raoul: 101,
      Josiane: 10,
      Marcel: 110,
      René: 46,
      Paul: 115,
      Jacques: 94,
    },
    {
      Raoul: 130,
      Josiane: 179,
      Marcel: 94,
      René: 124,
      Paul: 25,
      Jacques: 46,
    },
    {
      Raoul: 88,
      Josiane: 196,
      Marcel: 93,
      René: 65,
      Paul: 146,
      Jacques: 193,
    },
    {
      Raoul: 196,
      Josiane: 99,
      Marcel: 24,
      René: 17,
      Paul: 20,
      Jacques: 166,
    },
    {
      Raoul: 181,
      Josiane: 46,
      Marcel: 71,
      René: 102,
      Paul: 24,
      Jacques: 131,
    },
  ];
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
      <div className="grid sm:grid-cols-12 py-4 h-[90%]">
        <div className="sm:col-span-9 text-white h-[90%]  border-b sm:border-r sm:border-b-0 border-dotted border-gray-400">
          <h1 className="text-2xl font-bold p-2  underline">
            Sales Statistics
          </h1>
          <StreamChart {...{ data: dummy }} />
        </div>
        <div className="sm:col-span-3 p-2 overflow-y-scroll no-scrollbar">
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
      <div className="grid sm:grid-cols-12">second list 2</div>

      <div className="grid sm:grid-cols-12">
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
        <div className="sm:col-span-3 px-4">
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
