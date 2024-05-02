import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CarousalGyms from "./CarousalGyms";
import Carousel from "react-bootstrap/Carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchGymList } from "@/api/user";

const UserHome = () => {
  const [gymList, setGymList] = useState([]);

  const {
    isLoading,
    data: gymsQuery,
    refetch,
  } = useQuery({
    queryKey: ["gyms"],
    queryFn: fetchGymList,
  });

  useEffect(() => {
    setGymList(gymsQuery?.data?.message);
  }, [gymsQuery]);

  console.log(gymList);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Carousel slide={false}>
            <Carousel.Item>
              <img src="/banner.png" alt="" />
            </Carousel.Item>
          </Carousel>

          <h1 className="text-2xl font-bold mt-4 mb-10">EXPLORE OUR GYMS</h1>

          <CarousalGyms loading={isLoading} gyms={gymList} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserHome;
