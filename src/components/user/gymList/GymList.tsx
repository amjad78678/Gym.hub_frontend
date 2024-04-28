import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GymCard from "./GymCard";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useQuery } from "@tanstack/react-query";
import { fetchGymList } from "@/api/user";
import { Slider } from "@mui/material";

const GymList = () => {


    const [gymList,setGymList]=useState([])

    const {isLoading,data,refetch}=useQuery({queryKey:['gyms'],queryFn:fetchGymList})

    const getAriaValueText = (value: number) => {
      return `Value: ${value}`;
    };

    useEffect(()=>{
    
        if(data){
            setGymList(data.data.message)
        }

    },[data])




  return (
    <div className="text-white min-h-screen">
      <Container fluid>
        <Row>
          <Col xs={3}>
            <div>
          <div className="flex items-center max-w-md mx-auto bg-black border border-white rounded-lg my-4">
         <div className="w-full">
        <input
          type="search"
          className="w-full px-4 py-1 bg-black text-white rounded-full focus:outline-none"
          placeholder="search"
    
        />
      </div>
      <div>
        <button
          type="submit"
          className={`flex items-center justify-center w-12 h-12 text-white rounded-r-lg `}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>


<div>

   <span className="mx-2 text-xl"><span>Filters</span>  <FilterListOutlinedIcon sx={{color:"white", float:"right",fontSize:"27px"}} /></span> 
  

<div className="mx-2">
<h1 className=" text-lg my-4">Price</h1>
   <Slider
  aria-label="Small steps"
  defaultValue={0.00000005}
  getAriaValueText={(value) => getAriaValueText(value)}
  step={0.00000001}
  marks
  min={-0.00000005}
  max={0.0000001}
  sx={{color:"white",  ml:0, mr:6}}
  valueLabelDisplay="auto"
/>

</div>

</div>
    </div>



          </Col>
          <Col xs={9} className=" rounded-lg overflow-y-scroll no-scrollbar max-h-screen">
         

          {gymList?.map((gym)=>{

            return <GymCard key={gym._id} gym={gym} />

          })}
          </Col>


        </Row>
      </Container>
    </div>
  );
};

export default GymList;
