import Navbar from "@/components/common/Navbar";
import React from "react";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const GymDetailsSkeleton = () => {
  return (
    <>
      <Navbar {...{ fixed: true }} />
      <Container>
        <div className="grid sm:grid-cols-12">
          <div className="sm:col-span-6">
            <div className="grid sm:grid-cols-12">
              <div className="hidden lg:col-span-4 mr-4">
                <Skeleton width={170} count={4} height={80} />
              </div>
              <div className="sm:col-span-8 ml-2">
                <Skeleton height={330} />
              </div>
            </div>
          </div>
          <div className="sm:col-span-6 ml-4">
            <Skeleton height={30} count={2} width={150} />
            <Skeleton className="mt-2" height={30} />
            <Skeleton className="mt-2" height={30} />
            <Skeleton height={30} count={2} width={150} />
            <Skeleton className="mt-2" height={50} width={200} />
            <Skeleton className="mt-4" height={40} width={150} />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton height={300} count={1} />
        </div>
      </Container>
    </>
  );
};

export default GymDetailsSkeleton;
