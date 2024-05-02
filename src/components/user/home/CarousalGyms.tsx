import React, { useState } from "react";
import CarousalCard from "./CarousalCard";

const CarousalGyms = ({loading,gyms}) => {


    const [currentIndex,setCurrentIndex]= useState(0);



    const handlePrev=()=>{
        setCurrentIndex((prevCurrentIndex)=>(prevCurrentIndex-1+gyms.length)%gyms.length)
    }

    const handleNext=()=>{
        setCurrentIndex((prevCurrentIndex)=>(prevCurrentIndex+1)%gyms.length)
    }


  return gyms?.length>0 && (
    <div>
      <div
        className="relative bg-black rounded-lg block md:flex items-center shadow-xl"
        style={{ minHeight: "19rem" }}
      >
   

    {gyms.slice(currentIndex,currentIndex+4).map((gym,index)=>{

    return <CarousalCard key={index} gym={gym} />
   

  })
  
  
  
  }

 


  
      {gyms.length>4 && 
      <>
      <button onClick={handlePrev} className="absolute top-0 mt-32 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline">
          <span className="block" style={{ transform: "scale(-1)" }}>
            &#x279c;
          </span>
        </button>
        <button onClick={handleNext} className="absolute top-0 mt-32 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline">
          <span className="block" style={{ transform: "scale(1)" }}>
            &#x279c;
          </span>
        </button>
      
        </>
      
      }  
      </div>





    </div>
  );
};

export default CarousalGyms;
