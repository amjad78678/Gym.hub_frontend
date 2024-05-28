import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const GymListSkeleton = () => {
  return (
    <div className="text-white min-h-screen">
    <Container>
      <Row>
        <Col md={4} lg={3}>
          <div>
            <Skeleton height={40} />
            <div>
              <span className="text-xl">
                <Skeleton height={40} width={100} />
                <Skeleton
                  height={40}
                  width={27}
                  style={{ float: 'right', fontSize: '27px' }}
                />
              </span>
              <div>
                <Skeleton height={40} />
                <h1 className="text-lg mt-4 mb-2">
                  <Skeleton height={20} width={100} />
                </h1>
                <Skeleton height={40} />
                <Skeleton height={40} />
                <Skeleton height={40} />
              </div>
            </div>
          </div>
          <Skeleton height={40} />
        </Col>
        <Col
          lg={9}
          md={8}
          className="rounded-lg overflow-y-scroll no-scrollbar max-h-screen"
        >
     <div className="bg-black">
      <div className="flex flex-col my-4">
        <div className="relative bg-black flex flex-col md:flex-row md:space-x-5 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto">
          <div className="w-full md:w-1/3 bg-black grid place-items-center">
            <Skeleton height={200} width={200} className="rounded-xl" />
          </div>
          <div className="w-full md:w-2/3 bg-black text-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between items-center">
              <Skeleton width={50} height={20} />
              <div className="ms-28 flex items-center">
                <Skeleton width={20} height={20} className="mr-1" />
                <Skeleton width={100} height={20} />
              </div>
            </div>
            <Skeleton height={30} width="60%" />
            <div className="flex items-center">
              <Skeleton height={20} width="100%" />
            </div>
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />
            <div className="flex justify-between items-center">
              <Skeleton height={30} width="50%" />
              <Skeleton height={30} width={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
     <div className="bg-black">
      <div className="flex flex-col my-4">
        <div className="relative bg-black flex flex-col md:flex-row md:space-x-5 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto">
          <div className="w-full md:w-1/3 bg-black grid place-items-center">
            <Skeleton height={200} width={200} className="rounded-xl" />
          </div>
          <div className="w-full md:w-2/3 bg-black text-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between items-center">
              <Skeleton width={50} height={20} />
              <div className="ms-28 flex items-center">
                <Skeleton width={20} height={20} className="mr-1" />
                <Skeleton width={100} height={20} />
              </div>
            </div>
            <Skeleton height={30} width="60%" />
            <div className="flex items-center">
              <Skeleton height={20} width="100%" />
            </div>
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />
            <div className="flex justify-between items-center">
              <Skeleton height={30} width="50%" />
              <Skeleton height={30} width={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
     <div className="bg-black">
      <div className="flex flex-col my-4">
        <div className="relative bg-black flex flex-col md:flex-row md:space-x-5 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto">
          <div className="w-full md:w-1/3 bg-black grid place-items-center">
            <Skeleton height={200} width={200} className="rounded-xl" />
          </div>
          <div className="w-full md:w-2/3 bg-black text-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between items-center">
              <Skeleton width={50} height={20} />
              <div className="ms-28 flex items-center">
                <Skeleton width={20} height={20} className="mr-1" />
                <Skeleton width={100} height={20} />
              </div>
            </div>
            <Skeleton height={30} width="60%" />
            <div className="flex items-center">
              <Skeleton height={20} width="100%" />
            </div>
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />
            <div className="flex justify-between items-center">
              <Skeleton height={30} width="50%" />
              <Skeleton height={30} width={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
        </Col>
      </Row>
    </Container>
  </div>

  )
}

export default GymListSkeleton