
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { useMutation } from "@tanstack/react-query";
import { setGymLogout } from "@/redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
import { gymLogout } from "@/api/gym";
import { HomeOutlined } from "@mui/icons-material";

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
function GymNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uLoggedIn } = useSelector((state: iState) => state.auth);

  const { mutate: gymLogoutMutate } = useMutation({
    mutationFn: gymLogout,
    onSuccess: (res) => {
      if (res) {
        toast.success(res.data.message);
        dispatch(setGymLogout());
        navigate("/gym/gym-login");
      }
    },
  });

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>

      <Container className="bg-black">
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
                <Typography textAlign="center">Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Members</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Subscriptions</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Trainers</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Coupons</Typography>
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
            <Link to={"/gym/dashboard"}>
              {" "}
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
            </Link>
            <Link to={"/gym/members"}>
              {" "}
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
              Members
              </Button>
            </Link>
            <Link to={"/gym/subscriptions"}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
         Subscriptions
            </Button>
            </Link>
            <Link to={"/gym/trainers"}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
         Trainers
            </Button>
            </Link>
            <Link to={"/gym/coupons"}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
         Coupons
            </Button>
            </Link>
          </Box>

            <HomeOutlined
              onClick={() => {
                gymLogoutMutate();
              }}
              sx={{ fontSize: 33,color: "white", cursor: "pointer" }}
            />
       
        </Toolbar>
      </Container>
      {status === "pending" && <Loader />}
    </>
  );
}
export default GymNavbar;
