import React from 'react'
import { Link } from 'react-router-dom';

const CarousalCard = ({gym}) => {

    

  return (
    !gym.isDeleted && (
     <Link to={`/gym-details?id=${gym._id}`}> <div className="flex cursor-pointer mx-2  flex-col rounded-lg bg-black border-1 border-gray-500 ">
        <div className="rounded-lg m-0 overflow-hidden bg-transparent bg-clip-border text-gray-700 shadow-none">
          <img
            className="w-full h-full"
            src={gym.images[0].imageUrl}
            alt="ui/ux review check"
          />
        </div>
        <div className="p-3">
          <h4 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">
            {gym.gymName}
          </h4>
          <p className="mt-2 block font-sans  font-normal leading-relaxed text-gray-400 antialiased">
            {gym.description.substring(0, 70) + "..."}
          </p>
        </div>
      </div></Link>
    )
  );
}

export default CarousalCard