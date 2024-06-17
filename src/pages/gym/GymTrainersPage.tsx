import { fetchTrainers } from "@/api/gym";
import EditTrainerModal from "@/components/gym/gymTrainer/EditTrainerModal";
import AddTrainerModal from "@/components/gym/gymTrainer/AddTrainerModal";
import Trainers from "@/components/gym/gymTrainer/Trainers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GymNavbar from "@/components/gym/common/GymNavbar";
import Loader from "@/components/common/Loader";

const GymTrainersPage = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const {
    isLoading,
    data: trainersData,
    refetch,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: fetchTrainers,
  });

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    if (trainersData) {
      setTrainers(trainersData.data.message);
    }
  }, [trainersData]);

  
  

  return isLoading || !trainers ? (
    <>
      <GymNavbar {...{ fixed: false }} />
      <Loader />
    </>
  ) : (
    <div className="bg-black">
      <GymNavbar {...{ fixed: false }} />
      <Container>
        <Trainers
          {...{
            open,
            setOpen,
            setSelectedRow,
            editOpen,
            setEditOpen,
            trainers,
            refetch,
          }}
        />
      </Container>
      {open && <AddTrainerModal {...{ open, setOpen, refetch }} />}
      {editOpen && (
        <EditTrainerModal
          {...{ editOpen, selectedRow, setEditOpen, refetch }}
        />
      )}
    </div>
  );
};

export default GymTrainersPage;
