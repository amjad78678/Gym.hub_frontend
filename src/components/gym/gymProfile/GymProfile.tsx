import { gymLogout } from "@/api/gym";
import { setGymLogout } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import {
  Call,
  ContactEmergency,
  Email,
  LocationCity,
  LocationOn,
} from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditGym from "./EditGym";
import { Typography } from "@mui/material";

const GymProfile = ({ gym }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState("");
  const divStyle = {
    backgroundImage: `url("${gym[0].images[1].imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

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

  console.log("aim gym", gym);

  return (
    gym && (
      <div>
        <div style={divStyle} className="h-40 lg:h-52 relative">
          <Container>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="flex justify-between items-center">
              <div className="z-10 my-20">
                <h1
                  className="text-white text-3xl xs:text-5xl sm:text-6xl md:text-7xl font-semibold whitespace-normal max-w-screen-sm font-serif"
                  style={{ textShadow: "1px 1px 1px #000000" }}
                >
                  {gym[0].gymName}
                </h1>
              </div>
              <div className="z-10">
                <Button onClick={() => gymLogoutMutate()} variant="danger">
                  Logout
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="font-semibold my-2  h-10 shadow-2xl text-white bg-black rounded-sm w-full flex justify-center items-center gap-4">
            <h1
              className="cursor-pointer hover:underline"
              onClick={() => setToggle("myGym")}
            >
              MY GYM
            </h1>
            <h1>|</h1>
            <h1
              className="cursor-pointer hover:underline"
              onClick={() => setToggle("editGym")}
            >
              EDIT
            </h1>
          </div>
        </Container>
        <div className="px-5 py-2">
          {toggle === "editGym" ? (
            <EditGym />
          ) : (
            <>
              <h1 className="text-lg font-semibold mt-2">
                <LocationOn />
                <span className="font-mono ml-2">{gym[0].address}</span>
              </h1>
              <div>
                <Call />
                <span className="text-lg mb-2 ml-2 font-mono font-semibold">
                  {gym[0].contactNumber}
                </span>
              </div>
              <div>
                <Email />
                <span className="text-lg mb-2 ml-2 font-mono font-semibold">
                  {gym[0].email}
                </span>
              </div>

              <div className="mt-10 border border-white rounded-md shadow-lg p-3">
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    color: "white",
                    fontFamily: "cursive",
                  }}
                >
                  {gym[0].description}
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default GymProfile;
