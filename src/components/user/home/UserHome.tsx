import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CarousalGyms from "./CarousalGyms";
import Carousel from "react-bootstrap/Carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchGymList } from "@/api/user";
import FaqSection from "./FaqSection";
import MySliderBanner from "./MySliderBanner";

const UserHome = () => {
  const [gymList, setGymList] = useState([]);

  const { isLoading, data: gymsQuery } = useQuery({
    queryKey: ["gyms"],
    queryFn: fetchGymList,
  });

  useEffect(() => {
    setGymList(gymsQuery?.data.message);
  }, [gymsQuery]);

  return (
    <>
      <MySliderBanner />
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="text-2xl font-bold mt-4 mb-10">EXPLORE OUR GYMS</h1>

            <CarousalGyms loading={isLoading} gyms={gymList} />

            <FaqSection />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserHome;
