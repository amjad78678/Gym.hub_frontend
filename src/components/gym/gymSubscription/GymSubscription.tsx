import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "react-bootstrap";
import { Box, Button } from "@mui/material";
import ModalSubscriptionEdit from "./ModalSubscriptionEdit";
import { useQuery } from "@tanstack/react-query";
import { fetchGymSubscription } from "@/api/gym";

const GymSubscription = () => {
  const [open, setOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<string[] | null>(null);

  const functionopenpopup = (subscriptionDetails: string[]|null) => {
    setEditingSubscription(subscriptionDetails);
    setOpen(!open);
  };

  const {
 
    data: gymSubscriptionData,
    refetch,
  } = useQuery({
    queryKey: ["gymSubscription"],
    queryFn: fetchGymSubscription,
  });

  const [subs,setSubs]=useState([])



  useEffect(() => {
    if (gymSubscriptionData) {
       // Assuming gymSubscriptionData.data[0].subscription is the correct path to your subscription data
       setSubs(gymSubscriptionData.data[0].subscriptions);
    }
  
   }, [gymSubscriptionData]); // Depend on gymSubscriptionData to trigger the effect when it changes
   

   const subsArray = Object.entries(subs).map(([key, value]) => ({
    subscription: key,
    amount: value,
   }));


  return (
    <div className="bg-black min-h-screen">
      <Container className="text-white">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TableContainer
            className="mx-auto"
            sx={{ maxHeight: "500px", maxWidth: "70%" }}
            component={Paper}
          >
            <Table
              className="bg-gray-800 "
              stickyHeader
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ backgroundColor: "#fafafa", color: "black" }}
                  >
                    SN
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#fafafa", color: "black" }}
                  >
                    Subscription
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#fafafa", color: "black" }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#fafafa", color: "black" }}
                    align="center"
                  >
                    Edit Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subsArray.map((row, index) => (
                  <TableRow
                    key={row.subscription}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="text-white">{index + 1}</TableCell>
                    <TableCell className="text-white">
                      {row.subscription}
                    </TableCell>
                    <TableCell className="text-white">{row.amount}</TableCell>
                    <TableCell
                      onClick={() =>
                        functionopenpopup([row.subscription, row.amount])
                      }
                      align="center"
                    >
                      <Button sx={{ color: "yellow" }}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      {open && (
        <ModalSubscriptionEdit
          clickHandle={() => functionopenpopup(null)}
          subscription={editingSubscription}
          setSubscription={setEditingSubscription}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default GymSubscription;
