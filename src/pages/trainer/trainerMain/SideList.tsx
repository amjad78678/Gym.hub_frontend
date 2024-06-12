import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Box } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import {
  Dashboard,
  EditNote,
  Groups3Outlined,
  Logout,
} from "@mui/icons-material";
import { useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setTrainerLogout } from "@/redux/slices/authSlice";
import TrainerDashboardPage from "../TrainerDashboardPage";
import { fetchTrainerData, trainerLogout } from "@/api/trainer";
import TrainerChatPage from "../TrainerChatPage";
import ChatIcon from "@mui/icons-material/Chat";
import TrainerTrainee from "@/components/trainer/trainee/TrainerTrainee";
import TrainerTraineePage from "../TrainerTraineePage";
import TrainerProfilePage from "../TrainerProfilePage";
import Loader from "@/components/common/Loader";
import VideoCallPage from "@/pages/common/VideoCallPage";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideListProps {
  open: boolean;
  setOpen: any;
}
const SideList: React.FC<SideListProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    refetch: refetchTrainer,
    data: trainerDetails,
  } = useQuery({
    queryKey: ["trainerDataforTrainerSide"],
    queryFn: fetchTrainerData,
  });

  const [selectedLink, setSelectedLink] = useState("");
  console.log("iam tr detis", trainerDetails);

  const list = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <Dashboard />,
        link: "",
        component: <TrainerDashboardPage {...{ setSelectedLink, link: "" }} />,
      },
      {
        title: "Trainees",
        icon: <Groups3Outlined />,
        link: "trainees",
        component: (
          <TrainerTraineePage {...{ setSelectedLink, link: "trainees" }} />
        ),
      },
      {
        title: "Edit Profile",
        icon: <EditNote />,
        link: "profile",
        component: (
          <TrainerProfilePage
            {...{
              setSelectedLink,
              link: "profile",
              refetchTrainer,
              isLoading,
              data: trainerDetails,
            }}
          />
        ),
      },
      {
        title: "Chat",
        icon: <ChatIcon />,
        link: "chat",
        component: <TrainerChatPage {...{ setSelectedLink, link: "chat" }} />,
      },
    ],
    []
  );

  const { mutate } = useMutation({
    mutationFn: trainerLogout,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        dispatch(setTrainerLogout());
        navigate("/trainer");
      }
    },
  });

  const handleLogout = () => {
    console.log("logout");
    mutate();
  };

  const navigate = useNavigate();

  return trainerDetails ? (
    <>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        }}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <Box
          sx={{
            mx: "auto",
            mt: 3,
            mb: 1,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Tooltip title="Profile">
            <Avatar
              src={trainerDetails?.data.trainer.image.imageUrl}
              {...(open && { sx: { width: 70, height: 70 } })}
            />
          </Tooltip>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          {open ? (
            <Typography variant="h6">
              {trainerDetails?.data.trainer.name}
            </Typography>
          ) : null}
          <Typography variant="body2">TRAINER</Typography>
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
          <Route
            path="video_call/:trainerId/:userId"
            element={<VideoCallPage />}
          />
        </Routes>
      </Box>
    </>
  ) : (
    <Loader />
  );
};

export default SideList;
