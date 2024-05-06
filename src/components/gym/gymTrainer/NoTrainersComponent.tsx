import React from 'react';
import AddTrainerModal from './AddTrainerModal';

const NoTrainersComponent = ({setOpen}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">No Trainers Found</h1>
      <p className="text-lg mb-8">It seems like there is no trainers added to your gym. You can add a new trainer to get started.</p>
      <button onClick={() => setOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Trainers
      </button>

    </div>
  );
};

export default NoTrainersComponent;
