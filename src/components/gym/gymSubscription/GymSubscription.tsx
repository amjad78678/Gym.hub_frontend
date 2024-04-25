import React, { useState } from "react";
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

const GymSubscription = () => {
  const [open, setOpen] = useState(false);

  console.log(open);
  const functionopenpopup = () => {
    setOpen(!open);
  };
  const tableData = [
    {
      subscription: "Quarterly",
      amount: 1999,
    },
    {
      subscription: "Monthly",
      amount: 1900,
    },
    {
      subscription: "Annually",
      amount: 2000,
    },
  ];
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
                  <TableCell sx={{ backgroundColor: "#fafafa", color: "black" }}>
                    SN
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#fafafa", color: "black" }}>
                    Subscription
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#fafafa", color: "black" }}>
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
                {tableData.map((row, index) => (
                  <TableRow
                    key={row.subscription}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="text-white">{index + 1}</TableCell>
                    <TableCell className="text-white">
                      {row.subscription}
                    </TableCell>
                    <TableCell className="text-white">{row.amount}</TableCell>
                    <TableCell onClick={functionopenpopup} align="center">
                      <Button sx={{color:"yellow"}}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      {open && <ModalSubscriptionEdit clickHandle={functionopenpopup} />}
    </div>
  );
};

export default GymSubscription;
