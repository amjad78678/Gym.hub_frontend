import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import MenuItem from "@mui/material/MenuItem";
import { MenuItem as MuiDropMenuItem } from "@mui/base/MenuItem";
import { Menu as DropMenu } from "@mui/base/Menu";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

interface iState {
  auth: {
    uLoggedIn: boolean;

    userDetails: {
      id: string;
      name: string;
      profilePic: string;
    };
  };
}
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uLoggedIn, userDetails } = useSelector((state: iState) => state.auth);



  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="relative z-10">
    <AppBar sx={{ backgroundColor: "black",boxShadow: "none" }} position="static">
      <Container className="bg-transparent p-2 border-none ">
        <Toolbar disableGutters>
          <img className="w-28" src="/removebg.png" alt="" />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                justifyContent: "center",
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Book offline gym</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}> 
                <Typography textAlign="center">Personal trainer</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Workouts</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Contact</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
          <Link to={'/'}>  <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            </Link>
          <Link to={'/book-gym'}>  <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Book offline gym
            </Button></Link>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Personal trainer
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Workouts
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact
            </Button>
          </Box>

          {uLoggedIn ? (
            //   <Dropdown>
            //   <MenuButton className='font-semibold text-lg mx-2'>{userDetails.name}</MenuButton>
            //   <DropMenu className='bg-black px-4 py-2 rounded-md'  slots={{ listbox: 'ol'  }} >
            //     <MuiDropMenuItem className='text-white cursor-pointer'>Profile</MuiDropMenuItem>

            //    <MuiDropMenuItem onClick={() => { handleLogout(); }} className='text-white cursor-pointer'>Log out</MuiDropMenuItem>
            //   </DropMenu>
            // </Dropdown>
            <AccountCircleOutlinedIcon
              onClick={() => navigate('/profile/subscriptions')}
              sx={{ fontSize: 33, cursor: "pointer" }}
            />
          ) : (
            <Link to={"/login"}>
              <Button
                className="font-bold mx-4"
                variant="contained"
                style={{ backgroundColor: "gold", color: "black" }}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
      {status === "pending" && <Loader />}
    </AppBar>
    </div>
  );
}
export default Navbar;
