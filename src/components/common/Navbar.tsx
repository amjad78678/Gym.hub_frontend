import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { GridMenuIcon } from "@mui/x-data-grid";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "@/api/user";
import { setUserLogout } from "@/redux/slices/authSlice";
import useScroll from "@/utils/hooks/useScroll";

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
function Navbar({ fixed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uLoggedIn } = useSelector((state: iState) => state.auth);
  const [dropMenu, setDropMenu] = useState(false);
  const handleDropMenu = () => {
    setDropMenu((prevDropMenu) => !prevDropMenu);
  };

  const { status, mutate: handleLogout } = useMutation({
    mutationFn: userLogout,
    onSuccess: (res) => {
      console.log(res);
      dispatch(setUserLogout());
      navigate("/login");
    },
  });
  const logoutHandler = () => {
    handleLogout();
  };

  const isScrolled = useScroll();

  const position = fixed ? "fixed" : "static";
  return (
    <div className="relative z-10">
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
        <Container className="bg-transparent p-2 border-none">
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
                <Link to="/">
                  <Button sx={{ my: 2, color: "white" }}>Home</Button>
                </Link>
                <Link to="/book-gym">
                  <Button sx={{ my: 2, color: "white" }}>
                    Book offline gym
                  </Button>
                </Link>
                <Link to="/personal-trainer">
                  <Button sx={{ my: 2, color: "white" }}>
                    Book personal trainer
                  </Button>
                </Link>
                <Link to="/workouts">
                  <Button sx={{ my: 2, color: "white" }}>Workouts</Button>
                </Link>
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                {uLoggedIn ? (
                  <AccountCircleOutlinedIcon
                    onClick={() => navigate("/profile/subscriptions")}
                    sx={{ fontSize: 33, cursor: "pointer", color: "white" }}
                  />
                ) : (
                  <Link to="/login">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "gold", color: "black" }}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </Box>
              <GridMenuIcon
                onClick={handleDropMenu}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "white",
                  ml: 2,
                }}
              />
            </Box>
          </Toolbar>
        </Container>
        {status === "pending" && <Loader />}
      </AppBar>
      {dropMenu && (
        <div
          className="fixed block lg:hidden left-1/2 z-full w-screen max-w-md -translate-x-1/2 transform"
          style={{ display: "block" }}
        >
          <div className="overflow-hidden rounded-sm shadow-lg">
            <div className="relative grid gap-2 bg-black text-gray-200 px-4 py-4 sm:gap-8 sm:p-8  ">
              <Link to="/">
                <p className="font-bold text-lg font-serif">Home</p>
              </Link>
              <Link to="/book-gym">
                <p className="font-bold text-lg font-serif">Book offline gym</p>
              </Link>
              <Link to="/personal-trainer">
                <p className="font-bold text-lg font-serif">
                  Book personal trainer
                </p>
              </Link>
              <Link to="/workouts">
                {" "}
                <p className="font-bold text-lg font-serif">Workouts</p>
              </Link>

              {uLoggedIn ? (
                <>
                  <Link to="/profile/subscriptions">
                    <p className="font-bold text-lg font-serif">Profile </p>{" "}
                  </Link>
                  <p
                    onClick={logoutHandler}
                    className="font-bold text-lg font-serif btn btn-danger"
                  >
                    Logout
                  </p>
                </>
              ) : (
                <p className="font-bold text-lg font-serif btn btn-danger">
                  <Link to="/login">Login</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Navbar;
