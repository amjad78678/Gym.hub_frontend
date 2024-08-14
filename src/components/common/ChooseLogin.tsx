import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ChooseLogin = () => {
  const { uLoggedIn } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (uLoggedIn) {
      navigate("/");
    }
  }, [navigate, uLoggedIn]);

  const columnVariants = {
    hidden: (direction) => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="bg-black text-white">
      <Container>
        <Row>
          <Col lg={6} className="text-center">
            <motion.div
              variants={columnVariants}
              initial="hidden"
              animate="visible"
              custom="left"
            >
              <motion.h1
                className="text-center text-4xl pt-5 font-semibold"
                variants={contentVariants}
              >
                For Gym Companies
              </motion.h1>
              <motion.p
                className="text-center pt-2 text-md"
                variants={contentVariants}
              >
                Maximize Your Gym's Potential with Our Comprehensive Management
                Platform
              </motion.p>
              <motion.h5
                className="text-center text-xl pt-4"
                variants={contentVariants}
              >
                We are the market-leading platform designed to empower gym
                companies with the tools they need to thrive in the competitive
                fitness industry. Our platform is specifically tailored to help
                gym companies manage their operations, attract new members, and
                enhance the overall customer experience.
              </motion.h5>
              <motion.div variants={contentVariants}>
                <Link to={"/gym/gym-login"}>
                  <Button
                    className="my-8 text-center inline-flex justify-center px-28"
                    variant="danger"
                    size="lg"
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={6} className="text-center">
            <motion.div
              variants={columnVariants}
              initial="hidden"
              animate="visible"
              custom="right"
            >
              <motion.h1
                className="text-center text-4xl pt-5 font-semibold"
                variants={contentVariants}
              >
                For Gym Users
              </motion.h1>
              <motion.p
                className="text-center pt-2 text-md"
                variants={contentVariants}
              >
                Unlock and Maximize Your Fitness Potential with Our Personalized
                Workout Platform.
              </motion.p>
              <motion.h5
                className="text-center text-xl pt-4"
                variants={contentVariants}
              >
                Discover a new way to achieve your fitness goals with our
                platform, designed to connect you with personal trainers and a
                wide range of workouts tailored to your needs. Whether you're
                looking to build strength, improve flexibility, or simply stay
                active, we've got you covered.
              </motion.h5>
              <motion.div variants={contentVariants}>
                <Link to={"/user-login"}>
                  <Button
                    className="my-14 text-center inline-flex justify-center px-28"
                    variant="danger"
                    size="lg"
                  >
                    Login
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChooseLogin;
