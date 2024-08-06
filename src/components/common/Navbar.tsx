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
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";

function Navbar({ fixed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { navPage } = useSelector((state: RootState) => state.app);
  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const [dropMenu, setDropMenu] = useState(false);
  const handleDropMenu = () => {
    setDropMenu((prevDropMenu) => !prevDropMenu);
  };

  const { status, mutate: handleLogout } = useMutation({
    mutationFn: userLogout,
    onSuccess: (res) => {
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
            <motion.div
              className="flex items-center justify-between w-full"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                className="navItems"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img className=" w-28" src="/removebg.png" alt="GymHub Logo" />
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", gap: 4 },
                  justifyContent: "center",
                }}
              >
                <Link to="/">
                  <Button
                    className="navItems"
                    sx={{
                      my: 2,
                      color: "white",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "2px",
                        backgroundColor: "rgb(241,214,5)",
                        marginTop: "2px",
                        transform:
                          navPage === "home" ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.3s ease-in-out",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                      },
                    }}
                  >
                    Home
                  </Button>
                </Link>
                <Link to="/book-gym">
                  <Button
                    className="navItems"
                    sx={{
                      my: 2,
                      color: "white",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "2px",
                        backgroundColor: "rgb(241,214,5)",
                        marginTop: "2px",
                        transform:
                          navPage === "book_offline_gym"
                            ? "scaleX(1)"
                            : "scaleX(0)",
                        transition: "transform 0.3s ease-in-out",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                      },
                    }}
                  >
                    Book offline gym
                  </Button>
                </Link>
                <Link to="/personal-trainer">
                  <Button
                    className="navItems"
                    sx={{
                      my: 2,
                      color: "white",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "2px",
                        backgroundColor: "rgb(241,214,5)",
                        marginTop: "2px",
                        transform:
                          navPage === "book_personal_trainer"
                            ? "scaleX(1)"
                            : "scaleX(0)",
                        transition: "transform 0.3s ease-in-out",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                      },
                    }}
                  >
                    Book personal trainer
                  </Button>
                </Link>
                <Link to="/workouts">
                  <Button
                    className="navItems"
                    sx={{
                      my: 2,
                      color: "white",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "2px",
                        backgroundColor: "rgb(241,214,5)",
                        marginTop: "2px",
                        transform:
                          navPage === "workouts" ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.3s ease-in-out",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                      },
                    }}
                  >
                    Workouts
                  </Button>
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
                    className="navItems"
                    onClick={() => navigate("/profile/subscriptions")}
                    sx={{ fontSize: 33, cursor: "pointer", color: "white" }}
                  />
                ) : (
                  <Link to="/login">
                    <Button
                      className="navItems"
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
            </motion.div>
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
                <Link to="/login">
                  <button className="font-bold w-full text-lg font-serif btn btn-danger">
                    <span>Login</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Navbar;
