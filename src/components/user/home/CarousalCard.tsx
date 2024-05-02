import React from 'react'

const CarousalCard = ({gym}) => {

    console.log('iam gym',gym)

  return !gym.isDeleted && (
    <div className="relative ml-3 flex max-w-[20rem] max-h-[20rem] flex-col rounded-lg bg-black border-1 border-gray-500 ">
    <div className="relative rounded-lg m-0 overflow-hidden bg-transparent bg-clip-border text-gray-700 shadow-none">
      <img className='w-full h-full'
        src={gym.images[0].imageUrl}
        alt="ui/ux review check"
       />
    </div>
    <div className="p-3">
      <h4 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-white antialiased">
        {gym.gymName}
      </h4>
      <p className="mt-2 block font-sans  font-normal leading-relaxed text-gray-400 antialiased">
        Because it's about motivating the doers. Because I'm here to follow my
        dreams and inspire others.
      </p>
    </div>

  </div>
  )
}

export default CarousalCard