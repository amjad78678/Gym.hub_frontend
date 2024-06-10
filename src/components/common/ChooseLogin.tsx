import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ChooseLogin = () => {

const {uLoggedIn}= useSelector((state: RootState)=>state.auth)
const navigate=useNavigate()
  useEffect(()=>{


   if(uLoggedIn){
    navigate('/')
   }


  },[navigate,uLoggedIn])


  return (
    <div className="bg-black text-white min-h-screen">

      
      <Container>
        <Row>
          <Col lg={6} className="text-center">
            <h1 className="text-center text-4xl pt-5 font-semibold">
              For Gym Companies
            </h1>
            <p className="text-center pt-2 text-md">
              Maximize Your Gym's Potential with Our Comprehensive Management
              Platform
            </p>
            <h5 className="text-center text-xl pt-4">
              We are the market-leading platform designed to empower gym
              companies with the tools they need to thrive in the competitive
              fitness industry. Our platform is specifically tailored to help
              gym companies manage their operations, attract new members, and
              enhance the overall customer experience.
            </h5>

            <Link to={"/gym/gym-login"}>  <Button
              className="my-8 text-center inline-flex justify-center px-28"
              variant="danger"
              size="lg"
            >
             Login
            </Button></Link>
          </Col>

          <Col lg={6} className="text-center">
            <h1 className="text-center text-4xl pt-5 font-semibold">
              For Gym Users
            </h1>
            <p className="text-center pt-2 text-md">
            Unlock and Maximize Your Fitness Potential with Our Personalized Workout Platform.
            </p>
            <h5 className="text-center text-xl pt-4">
              Discover a new way to achieve your fitness goals with our
              platform, designed to connect you with personal trainers and a
              wide range of workouts tailored to your needs. Whether you're
              looking to build strength, improve flexibility, or simply stay
              active, we've got you covered.
            </h5>

           <Link to={"/user-login"}> <Button
              className="my-14 text-center inline-flex justify-center px-28"
              variant="danger"
              size="lg"
            >
              Login
            </Button></Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChooseLogin;
