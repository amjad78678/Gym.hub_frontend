import { RootState } from "@/redux/store";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const GymDashboard = ({ gym }) => {
  const { gymDetails } = useSelector((state: RootState) => state.auth);
  const divStyle = {
    backgroundImage: `url("${gym[0].images[0].imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="">
      <div style={divStyle} className="h-40 lg:h-52 relative">
        <Container>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="flex justify-start items-center">
            <div className="z-10 my-20">
              <h1
                className="text-white text-3xl xs:text-5xl sm:text-6xl md:text-7xl font-semibold whitespace-normal max-w-screen-sm font-serif"
                style={{ textShadow: "1px 1px 1px #000000" }}
              >
                {gym[0].gymName}
              </h1>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <p className="text-white">Helo bro</p>
      </Container>
    </div>
  );
};

export default GymDashboard;
