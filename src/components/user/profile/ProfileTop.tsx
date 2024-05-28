import {
  AddOutlined,
  ArrowDropDown,
  EmailOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ProfileSubscriptions from "./gymSubscription/ProfileSubscriptions";
import ProfilePersonalTrainers from "./Trainers/ProfilePersonalTrainers";
import ProfileEditProfile from "./userEditProfile/ProfileEditProfile";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "@/api/user";
import { setUserLogout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import AddMoneyModal from "./AddMoneyModal";
import { IconButton } from "@mui/material";
import ProfileWalletHistory from "./walletHistory/ProfileWalletHistory";

const ProfileTop = ({ userData, refetch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const handleCloseModalAddMoney = () => {
    setAddMoneyOpen(!addMoneyOpen);
    console.log(addMoneyOpen);
  };
  const divStyle = {
    backgroundImage:
      'url("https://t4.ftcdn.net/jpg/03/50/81/89/240_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const { mutate: handleLogout } = useMutation({
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

  const [selected, setSelected] = useState("subscriptions");

  const list = useMemo(
    () => [
      {
        title: "Subscriptions",
        link: "subscriptions",
        component: (
          <ProfileSubscriptions
            {...{ selected: "Subscriptions", setSelected }}
          />
        ),
      },
      {
        title: "Trainers",
        link: "trainers",
        component: (
          <ProfilePersonalTrainers {...{ selected: "Trainers", setSelected }} />
        ),
      },
      {
        title: "Edit Profile",
        link: "edit_profile",
        component: (
          <ProfileEditProfile
            {...{ selected: "Edit profile", setSelected, refetch, userData }}
          />
        ),
      },
      {
        title: "Wallet History",
        link: "wallet_history",
        component: (
          <ProfileWalletHistory
            {...{
              selected: "Wallet History",
              setSelected,
              userData,
              handleCloseModalAddMoney,
              refetch,
            }}
          />
        ),
      },
    ],
    []
  );

  const [dropMenu, setDropMenu] = useState(false);
  const handleOpenDropMenu = () => {
    setDropMenu((prevDropMenu) => !prevDropMenu);
  };

  return (
    <>
      <div className="absolute inset-0 text-white">
        <div style={divStyle} className="h-24 lg:h-52 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <Container>
          <div className="lg:flex lg:flex-row lg:justify-between  flex flex-col items-center">
            <div className="relative lg:mr-4 lg:mb-0 lg:mt-0 mt-[-40px]">
              <img
                className="rounded-full border-8 border-black w-48 lg:w-40"
                src={userData?.profilePic.imageUrl}
                alt=""
              />
            </div>

            <div className="sm:flex sm:justify-between lg:items-center ms-4 sm:w-full lg:w-auto lg:flex-1">
              <div className="mt-2 flex flex-col items-center lg:items-start">
                <h1 className="lg:text-5xl text-center text-3xl mb-2 lg:mb-0 font-semibold">
                  Hi, {userData?.username}
                </h1>
                <div className="flex flex-col my-2 lg:flex-row gap-2 lg:gap-10 mr-4 sm:pt-2">
                  <p className="flex justify-center items-center gap-2 sm:text-lg lg:text-left">
                    <EmailOutlined /> {userData?.email}
                  </p>
                  <p className="sm:text-lg inline-flex justify-center items-center lg:text-left">
                    <WalletOutlined /> Wallet : ₹{userData?.wallet}
                    <IconButton onClick={handleCloseModalAddMoney}>
                      <AddOutlined
                        sx={{
                          color: "yellow",
                          fontSize: "25px",
                          cursor: "pointer",
                        }}
                      />
                    </IconButton>
                  </p>
                </div>
              </div>
              <div className="hidden lg:block lg:ml-4 mt-4 lg:mt-0">
                <button
                  className="bg-red-600 py-2 px-4 rounded bg-opacity-80 hover:bg-opacity-95 text-white"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* profile menu section  */}
          <div className="my-5 bg-gray-800 p-3 rounded">
            <Row>
              <Col lg={3}>
                <div className="bg-black text-white my-4 shadow rounded w-64 text-center h-fit hidden lg:block">
                  <div className="py-2 px-5">
                    <Link to={"/profile/subscriptions"}>
                      {" "}
                      <div className="py-3 border-b hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                        <h1 className="text-lg">Subscriptions</h1>
                      </div>
                    </Link>
                    <Link to={"/profile/trainers"}>
                      {" "}
                      <div className="py-3 border-b hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                        <h1 className="text-lg">Trainers</h1>
                      </div>
                    </Link>
                    <Link to={"/profile/edit_profile"}>
                      {" "}
                      <div className="py-3 border-b hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                        <h1 className="text-lg">Edit Profile</h1>
                      </div>
                    </Link>
                    <Link to={"/profile/wallet_history"}>
                      {" "}
                      <div className="py-3 hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                        <h1 className="text-lg">Wallet History</h1>
                      </div>
                    </Link>
                  </div>
                </div>
              </Col>

              <Col lg={9}>
                <div className="text-white shadow flex rounded justify-center gap-7 w-full">
                  <div className="relative w-full">
                    <div
                      onClick={handleOpenDropMenu}
                      className="cursor-pointer bg-black text-yellow-200 lg:text-white lg-text-white rounded p-2  shadow focus:outline-none text-center"
                    >
                      <p className="block lg:hidden uppercase">
                        {selected}
                        <ArrowDropDown sx={{ fontSize: "35px", pb: "4px" }} />
                      </p>
                      <p className="hidden lg:block uppercase">{selected}</p>
                    </div>
                    {dropMenu && (
                      <div className="block lg:hidden">
                        <div className="bg-black flex flex-col justify-center items-center text-white">
                          <ul className="text-center">
                            <Link to={"/profile/subscriptions"}>
                              {" "}
                              <li onClick={handleOpenDropMenu} className="my-2">
                                Subscriptions
                              </li>
                            </Link>
                            <Link to={"/profile/trainers"}>
                              <li onClick={handleOpenDropMenu} className="my-2">
                                Trainers
                              </li>
                            </Link>
                            <Link to={"/profile/edit_profile"}>
                              {" "}
                              <li onClick={handleOpenDropMenu} className="my-2">
                                Edit Profile
                              </li>
                            </Link>
                            <Link to={"/profile/wallet_history"}>
                              {" "}
                              <li onClick={handleOpenDropMenu} className="my-2">
                                Wallet History
                              </li>
                            </Link>
                          </ul>
                        </div>
                      </div>
                    )}
                    <div className="py-1 my-2 bg-gray-800 h-[300px] overflow-y-scroll no-scrollbar w-full border border-gray-300 rounded shadow-lg text-center z-50">
                      <Routes>
                        {list.map((item) => (
                          <Route
                            key={item.title}
                            path={item.link}
                            element={item.component}
                          />
                        ))}
                      </Routes>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {addMoneyOpen && (
        <AddMoneyModal
          {...{
            addMoneyOpen,
            setAddMoneyOpen,
            handleCloseModalAddMoney,
            refetch,
          }}
        />
      )}
    </>
  );
};

export default ProfileTop;
