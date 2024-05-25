import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import { ButtonGroup } from "react-bootstrap";
import dayjs from "dayjs";
import { Navigate, useNavigate } from "react-router-dom";

const TrainerCard = ({ trainer }) => {

  console.log('iam trainer',trainer)

  const navigate=useNavigate()
  const differenceDays = dayjs(trainer.expiryDate).diff(dayjs(trainer.bookinDate), "day");

  return trainer && (
    <>
      <div className="sm:col-span-4">
        <Card
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%" }}
            image={trainer?.trainerId.image.imageUrl}
            alt="Live from space album cover"
          />
        </Card>
      </div>
      <div className="p-2 text-start sm:col-span-8 bg-black">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl  font-bold font-serif ">
            Tr. {trainer.trainerId.name}
          </h2>
          <p className="float-right uppercase text-red-500">{differenceDays == 0 ? "Today" : `${differenceDays} days left`}</p>
        </div>

        <h4 className="text-gray-300">
          Gym Trainer : {trainer.trainerId.gymId.gymName}
        </h4>
        <h4 className="text-gray-300">Gender : {trainer.trainerId.gender}</h4>
        <h4 className="text-gray-300">Age : {trainer.trainerId.age}</h4>
        <h4 className="text-gray-300">
          Experiance : {trainer.trainerId.experience} Years
        </h4>
        <h4 className="text-gray-300">
          Achievements : {trainer.trainerId.achievements}
        </h4>
        <span>
        <span className="text-gray-300 ">
          Expiry Date : {dayjs(trainer.expiryDate).format("DD MMM YYYY")}
        </span>
        <button onClick={()=>navigate(`/chat/${trainer.userId}/${trainer.trainerId._id}`)} className="lg:float-right outline-dotted outline-1 outline-white p-2 rounded-md hover:outline-green-500 hover:text-green-500">Contact Trainer</button>
        </span>
      
      </div>
    </>
  )
};

export default TrainerCard;
