import React, { useMemo, useState } from "react";
import { createTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SideList from "./SideList";
import { ThemeProvider } from "@emotion/react";
import { Tooltip } from "@mui/material";
import { Brightness4Sharp, Brightness7, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const darkTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: dark ? "dark" : "light",
      },
    });
  }, [dark]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: !dark ? "#9f9f9f" : "#000000", padding: 1 }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate("/")}>
                <Home />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>

            {/* <IconButton onClick={() => setDark(!dark)}>
              {dark ? <Brightness7 /> : <Brightness4Sharp />}
            </IconButton> */}
          </Toolbar>
        </AppBar>

        <SideList {...{ open, setOpen }} />
      </Box>
    </ThemeProvider>
  );
}
