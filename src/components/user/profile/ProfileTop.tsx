import {
  AddOutlined,
  EmailOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ProfileSubscriptions from "./ProfileSubscriptions";
import ProfilePersonalTrainers from "./ProfilePersonalTrainers";
import ProfileEditProfile from "./ProfileEditProfile";
import ProfileChangePassword from "./ProfileChangePassword";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "@/api/user";
import { setUserLogout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import AddMoneyModal from "./AddMoneyModal";
import { Button, IconButton } from "@mui/material";
import ProfileWalletHistory from "./ProfileWalletHistory";

const ProfileTop = ({userData,refetch}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const divStyle = {
    backgroundImage:
      'url("https://t4.ftcdn.net/jpg/03/50/81/89/240_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
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

  const [selected,setSelected]=useState('subscriptions')

  const list = useMemo(()=>[
    {title: "Subscriptions",link: "subscriptions",component: <ProfileSubscriptions  {...{selected:'Subscriptions',setSelected}} />},
    {title: "Trainers",link: "trainers",component: <ProfilePersonalTrainers {...{selected:'Trainers',setSelected}} />},
    {title: "Edit Profile",link: "edit_profile",component: <ProfileEditProfile {...{selected:'Edit profile',setSelected}} />},
    {title: "Change Password",link: "change_password",component: <ProfileChangePassword {...{selected:'Change password',setSelected}} />},
    {title: "Wallet History", link: "wallet_history", component: <ProfileWalletHistory {...{selected:'Wallet History',setSelected}}/> },
],[])

const [addMoneyOpen,setAddMoneyOpen]=useState(false)
const handleCloseModalAddMoney = ()=>{
  setAddMoneyOpen(!addMoneyOpen)
  console.log(addMoneyOpen)
 }

  return (
    <>
      <div className="absolute inset-0 bg-black text-white">
        <div style={divStyle} className="h-52 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <Container>
          <div className="flex">
            <div className="relative mt-[-40px]">
              <img
                className="rounded-full border-8 border-black w-40"
                src={userData?.profilePic}
                alt=""
              />
            </div>

            <div className="sm:flex sm:justify-between ms-4 sm:w-full">
              <div className="sm:mt-14 mt-2 flex flex-col items-center">
                <h1 className="sm:text-6xl text-3xl mr-4 font-semibold">
                  Hi, {userData?.username}
                </h1>
                <div className="flex flex-col my-2  sm:flex-row gap-2 sm:gap-10  sm:pt-2">
                  <p className="flex items-center gap-2 ms-4 sm:text-lg">
                    <EmailOutlined /> {userData?.email}
                  </p>
                  <p className="sm:text-lg">
                    <WalletOutlined /> Wallet : ₹{userData?.wallet}
                    <IconButton onClick={handleCloseModalAddMoney}>   <AddOutlined 
                      sx={{
                        color: "yellow",
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                    /></IconButton>
                 
                  </p>
                </div>
              </div>
              <div className="hidden sm:block clear-left mt-12">
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
        
            <Col xs={3}>
            <div className="bg-black text-white my-4 shadow rounded w-64 text-center h-fit hidden lg:block">
              <div className="py-2 px-5">
               <Link to={'/profile/subscriptions'}> <div className="py-3 border-b hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                  <h1 className="text-lg">Subscriptions</h1>
                </div></Link>
                <Link to={'/profile/trainers'}> <div className="py-3 border-b hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                  <h1 className="text-lg">Trainers</h1>
                </div></Link>
                <Link to={'/profile/edit_profile'}> <div className="py-3 border-b hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                  <h1 className="text-lg">Edit Profile</h1>
                </div></Link>
                <Link to={'/profile/change_password'}> <div className="py-3 border-b hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                  <h1 className="text-lg">Change Password</h1>
                </div></Link> 
                <Link to={'/profile/wallet_history'}> <div className="py-3 hover:bg-gray-700 transition-all duration-100 cursor-pointer">
                  <h1 className="text-lg">Wallet History</h1>
                </div></Link> 
           
              </div>
            </div>

            </Col>

            <Col xs={9}>
            
            <div className=" text-white shadow flex rounded justify-center gap-7 w-full">
              <div className="relative w-full">
                <div className="cursor-pointer bg-black rounded p-2  shadow focus:outline-none text-center">
                  <p className="uppercase">{selected}</p>
                </div>
                <div className="py-1 my-2 bg-gray-800 h-[300px] overflow-y-scroll no-scrollbar w-full border border-gray-300 rounded shadow-lg text-center z-50">

                {/* list menus are shown here  */}


                <Routes>

                  {list.map((item)=>(

               <Route key={item.title} path={item.link} element={item.component} />

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
        <AddMoneyModal {...{ addMoneyOpen, setAddMoneyOpen ,handleCloseModalAddMoney,refetch}}/>
      )}
    </>
  );
};

export default ProfileTop;
