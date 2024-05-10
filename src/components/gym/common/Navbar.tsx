// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Dropdown } from "@mui/base/Dropdown";
// import { MenuButton } from "@mui/base/MenuButton";
// import { Menu } from "@mui/base/Menu";
// import { MenuItem } from "@mui/base/MenuItem";
// import { useMutation } from "@tanstack/react-query";
// import { gymLogout } from "@/api/gym";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setGymLogout } from "@/redux/slices/authSlice";
// import { Container } from "react-bootstrap";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { mutate: gymLogoutMutate } = useMutation({
//     mutationFn: gymLogout,
//     onSuccess: (res) => {
//       if (res) {
//         toast.success(res.data.message);
//         dispatch(setGymLogout());
//         navigate("/gym/gym-login");
//       }
//     },
//   });

//   return (
//     <Container>
//       <div className="bg-opacity-30 bg-black text-white right-0 left-0 top-0 z-50">
//         <div>
//           <div className="flex items-center justify-between py-2.5">
//             <div>
//               <a href="/club">
//                 <img src="/removebg.png" alt="Main Logo" width="100rem" />
//               </a>
//             </div>

//             <div className="hidden md:flex md:items-center">
//               <Link
//                 to={"/gym/dashboard"}
//                 className="text-md font-semibold relative mr-9 group"
//               >
//                 Dashboard
//                 <span className="absolute left-0 right-0 bottom-0 h-px top-7 transition-all"></span>
//               </Link>
//               <Link
//                 to={"/gym/subscriptions"}
//                 className="text-md font-semibold relative mr-9 group"
//               >
//                 Subscriptions
//                 <span className="absolute left-0 right-0 bottom-0 h-px top-7 transition-all"></span>
//               </Link>
//               <Link
//                 to={"/gym/members"}
//                 className="text-md font-semibold relative mr-9 group"
//               >
//                 Members
//                 <span className="absolute left-0 right-0 bottom-0 h-px top-7 transition-all"></span>
//               </Link>
//               <Link
//                 to={"/gym/trainers"}
//                 className="text-md font-semibold relative mr-9 group"
//               >
//                 Trainers
//                 <span className="absolute left-0 right-0 bottom-0 h-px top-7 transition-all"></span>
//               </Link>
//               <Dropdown>
//                 <MenuButton className="font-semibold">My Gym</MenuButton>
//                 <Menu slots={{ listbox: "ol" }}>
//                   <MenuItem className="text-white cursor-pointer">
//                     Profile
//                   </MenuItem>

//                   <MenuItem
//                     onClick={() => gymLogoutMutate()}
//                     className="text-white cursor-pointer"
//                   >
//                     Log out
//                   </MenuItem>
//                 </Menu>
//               </Dropdown>
//             </div>

//             <div className="md:hidden cursor-pointer">
//               <img
//                 src="path/to/MenuIconType.png"
//                 alt="Menu Icon"
//                 width="30rem"
//               />
//             </div>
//           </div>

//           <div className="block md:hidden bg-white rounded py-2">
//             <div className="flex flex-col p-3">
//               <a
//                 href="#"
//                 className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-2"
//               >
//                 Dashboard
//               </a>
//               <a
//                 href="/club/fixture"
//                 className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-2"
//               >
//                 Fixtures
//               </a>
//               <a
//                 href="/club/team"
//                 className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-2"
//               >
//                 Team
//               </a>
//               <a
//                 href="/club/profile"
//                 className="text-gray-800 text-md font-semibold hover:text-purple-600 mb-2"
//               >
//                 My Club
//               </a>
//               <div className="flex justify-between items-center border-t-2 pt-2">
//                 <button className="text-gray-800 text-md font-semibold border px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white">
//                   Log Out
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Navbar;

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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
function Navbar() {
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

      <Container className="bg-black p-2 ">
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
export default Navbar;
