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
import { CSSObject, Theme, styled } from "@mui/material/styles";
import {
  CardMembershipOutlined,
  Dashboard,
  FitnessCenterOutlined,
  GroupOutlined,
  Logout,
  SportsKabaddiOutlined,
  ViewCarouselOutlined,
} from "@mui/icons-material";
import { Suspense, lazy, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { adminLogout } from "@/api/admin";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAdminLogout } from "@/redux/slices/authSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoadingSkeleton from "@/components/user/skeletons/LoadingSkeleton";

const AdminDashboardPage = lazy(() => import("../AdminDashboardPage"));
const AdminGymPage = lazy(() => import("../AdminGymPage"));
const AdminUsersPage = lazy(() => import("../AdminUsersPage"));
const AdminSubscriptionPlans = lazy(() => import("../AdminSubscriptionPlans"));
const AdminTrainerPlans = lazy(() => import("../AdminTrainerPlans"));
const AdminBannerPage = lazy(() => import("../AdminBannerPage"));
const AdminGymDetailsPage = lazy(() => import("../AdminGymDetailsPage"));

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

const SideList = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [selectedLink, setSelectedLink] = useState("");

  const list = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <Dashboard />,
        link: "",
        component: <AdminDashboardPage {...{ setSelectedLink, link: "" }} />,
      },
      {
        title: "Gyms",
        icon: <FitnessCenterOutlined />,
        link: "gyms",
        component: <AdminGymPage {...{ setSelectedLink, link: "gyms" }} />,
      },
      {
        title: "Users",
        icon: <GroupOutlined />,
        link: "users",
        component: <AdminUsersPage {...{ setSelectedLink, link: "users" }} />,
      },
      {
        title: "Subscriptions",
        icon: <CardMembershipOutlined />,
        link: "subscription_plans",
        component: (
          <AdminSubscriptionPlans
            {...{ setSelectedLink, link: "subscription_plans" }}
          />
        ),
      },
      {
        title: "Trainers",
        icon: <SportsKabaddiOutlined />,
        link: "trainer_plans",
        component: (
          <AdminTrainerPlans {...{ setSelectedLink, link: "trainer_plans" }} />
        ),
      },
      {
        title: "Banners",
        icon: <ViewCarouselOutlined />,
        link: "banners",
        component: (
          <AdminBannerPage {...{ setSelectedLink, link: "banners" }} />
        ),
      },
    ],
    []
  );

  const { mutate } = useMutation({
    mutationFn: adminLogout,
    onSuccess: (res) => {
      if (res) {
        toast.success(res?.data.message);
        dispatch(setAdminLogout());
        navigate("/admin");
      }
    },
  });

  const handleLogout = () => {
    console.log("logout");
    mutate();
  };

  const navigate = useNavigate();

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
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

        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip title="Gym Hub">
            <Avatar
              src="/1logo.png"
              {...(open && { sx: { width: 70, height: 70 } })}
            />
          </Tooltip>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          {open ? <Typography variant="h6">Amjad ali</Typography> : null}
          <Typography variant="body2">ADMIN</Typography>
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "hidden" }}>
        <DrawerHeader />
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            {list.map((item) => (
              <Route
                key={item.title}
                path={item.link}
                element={item.component}
              />
            ))}
            <Route path="gym/:id" element={<AdminGymDetailsPage />} />
          </Routes>
        </Suspense>
      </Box>
    </>
  );
};

export default SideList;
