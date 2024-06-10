import { Container } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import TrainerActions from "./TrainerActions";
import NoTrainersComponent from "./NoTrainersComponent";
import SearchInput from "@/components/admin/common/SearchInput";

const Trainers = ({
  setOpen,
  setEditOpen,
  trainers,
  refetch,
  setSelectedRow,
}) => {
  console.log("trainers", trainers);
  const [activeTrainers, setActiveTrainers] = useState([]);
  useEffect(() => {
    if (trainers) {
      setActiveTrainers(trainers.filter((trainer) => !trainer.isDeleted));
    }
  }, [trainers]);

  const [rowId, setRowId] = useState<string>("");
  const [selectedRowId, setSelectedRowId] = useState<string>("");

  console.log("iamrowId", rowId);
  console.log("iamselectedRowId", selectedRowId);

  const columns: any = useMemo(
    () => [
      {
        field: "imageUrl",
        headerName: "Avatar",
        width: 90,
        renderCell: (params) => {
          return <Avatar src={params.row.image.imageUrl} />;
        },
      },
      {
        field: "name",
        headerName: "Name",
        width: 110,
      },

      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "createdAt",
        headerName: "Created",
        width: 100,
        renderCell: (params) =>
          dayjs(params.row.createdAt).format("DD/MM/YYYY"),
      },
      {
        field: "monthlyFee",
        headerName: "Monthly fee",
        width: 100,
      },
      {
        field: "yearlyFee",
        headerName: "Yearly fee",
        width: 100,
      },

      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => (
          <TrainerActions
            {...{
              params,
              setSelectedRow,
              setEditOpen,
              selectedRowId,
              setSelectedRowId,
              setRowId,
              refetch,
            }}
          />
        ),
      },
    ],
    [rowId, selectedRowId]
  );

  const [pageSize, setPageSize] = useState(5);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtered = trainers.filter((trainer) => {
      return trainer.name.toLowerCase().includes(search.toLowerCase());
    });
    setActiveTrainers(filtered);
  }, [search]);

  return trainers.length > 0 ? (
    <Container>
      <div className="">
        <Box
          sx={{
            height: "600",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: {
                md: 50,
                xs: 30,
              },
              mt: 3,
              mb: 3,
              color: "white",
            }}
          >
            Manage Trainers
          </Typography>
          <div className="flex justify-between">
            <SearchInput {...{ search, setSearch }} />
            <Button
              sx={{
                color: "yellow",
                fontSize: {
                  md: 20,
                  xs: 10,
                },
              }}
              onClick={() => setOpen(true)}
            >
              Add Trainer
            </Button>
          </div>

          <DataGrid
            columns={columns}
            rows={activeTrainers}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? grey[200] : grey[900],
              },
            }}
            getRowId={(row: { _id: string }) => row._id}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            onCellEditStop={(params) => setSelectedRowId(params.id.toString())}
            onCellEditStart={(params) => setRowId(params.id.toString())}
          />
        </Box>
      </div>
    </Container>
  ) : (
    <NoTrainersComponent {...{ setOpen }} />
  );
};

export default Trainers;
