import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { setGymLogout } from "@/redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { gymLogout } from "@/api/gym";
import { HomeOutlined } from "@mui/icons-material";
import { AppBar } from "@mui/material";
import useScroll from "@/utils/hooks/useScroll";
import { useState } from "react";
import { GridMenuIcon } from "@mui/x-data-grid";

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
function GymNavbar({ fixed }) {
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

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isScrolled = useScroll();

  console.log("isscrolling", isScrolled);

  const position = fixed ? "fixed" : "static";

  const [dropMenu, setDropMenu] = useState(false);

  return (
    <div className="relative z-20">
      <AppBar
        sx={{
          backgroundColor: isScrolled
            ? "rgba(0, 0, 1, 0.9)"
            : "rgba(0, 0, 1, 0.3)",
          transition: isScrolled ? "all 0.3s ease" : "none",
          boxShadow: "none",
          position: `${position}`,
          top: 0,
          width: "100%",
          zIndex: 1300,
        }}
      >
        <Container className="bg-transparent  border-none">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img className="w-28" src="/removebg.png" alt="GymHub Logo" />
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
                <Link to={"/gym/subscriptions"}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Plans
                  </Button>
                </Link>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                <Link to={"/gym/profile"}>
                  {" "}
                  <HomeOutlined
                    sx={{ fontSize: 33, color: "white", cursor: "pointer" }}
                  />
                </Link>
              </Box>

              <GridMenuIcon
                onClick={() => setDropMenu(!dropMenu)}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "white",
                  ml: 2,
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {dropMenu && (
        <div
          className="fixed mt-16 block lg:hidden left-1/2 z-full w-screen max-w-md -translate-x-1/2 transform"
          style={{ display: "block" }}
        >
          <div className="overflow-hidden rounded-sm shadow-lg">
            <div className=" relative grid gap-2 bg-black text-gray-200 px-4 py-4 sm:gap-8 sm:p-8  ">
              <Link to="/gym/dashboard">
                <p className="font-bold text-lg font-serif">Dashboard</p>
              </Link>
              <Link to="/gym/members">
                <p className="font-bold text-lg font-serif">Subscriptions</p>
              </Link>
              <Link to="/gym/trainers">
                <p className="font-bold text-lg font-serif">Trainers</p>
              </Link>
              <Link to="/gym/coupons">
                {" "}
                <p className="font-bold text-lg font-serif">Coupons</p>
              </Link>
              <Link to="/gym/subscriptions">
                {" "}
                <p className="font-bold text-lg font-serif">Plans</p>
              </Link>
              <Link to="/gym/profile">
                <p className="font-bold text-lg font-serif">Profile </p>{" "}
              </Link>
              <p
                onClick={() => gymLogoutMutate()}
                className="font-bold text-lg font-serif btn btn-danger"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default GymNavbar;
