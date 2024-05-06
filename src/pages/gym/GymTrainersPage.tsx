import { fetchTrainers } from "@/api/gym";
import AddTrainerModal from "@/components/gym/gymTrainer/AddTrainerModal";
import EditTrainerModal from "@/components/gym/gymTrainer/EditTrainerModal";
import NoTrainersComponent from "@/components/gym/gymTrainer/NoTrainersComponent";
import Trainers from "@/components/gym/gymTrainer/Trainers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const GymTrainersPage = () => {

const [open,setOpen]=useState(false)
const [editOpen,setEditOpen]=useState(false)
const [selectedRow, setSelectedRow] = useState(null);
const { data: trainersData,refetch } = useQuery({
  queryKey: ["trainers"],
  queryFn: fetchTrainers,
});

const [trainers, setTrainers] = useState([]);

useEffect(() => {
  if (trainersData) {
    setTrainers(trainersData.data.message);
  }
}, [trainersData]);

console.log(trainers);
console.log('selectedRow',selectedRow)

 
  return (
    <>
   <Container>
     <Trainers {...{open,setOpen,setSelectedRow,editOpen,setEditOpen,trainers,refetch}}/>

   </Container>
   {open && <AddTrainerModal {...{open,setOpen,refetch}}/>}
   {editOpen && <EditTrainerModal {...{editOpen,selectedRow,setEditOpen,refetch,selectedRow}}/>}
   </>

  );
};

export default GymTrainersPage;
