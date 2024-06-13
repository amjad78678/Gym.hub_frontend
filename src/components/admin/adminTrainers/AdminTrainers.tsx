import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import TrainerActions from "./TrainerActions";
import { fetchTrainers } from "@/api/admin";
import SearchInput from "../common/SearchInput";

const AdminTrainers = ({trainersData,refetch}) => {
  const [rowId, setRowId] = useState<string>("");
  const [selectedRowId, setSelectedRowId] = useState<string>("");
  const [activeTrainers, setActiveTrainers] = useState([]);

  useEffect(() => {
    if (trainersData) {
      setActiveTrainers(
        trainersData?.data.trainers.filter((trainer) => !trainer.isDeleted)
      );
    }
  }, [trainersData]);


  const columns: any = useMemo(
    () => [
      {
        field: "photoUrl",
        headerName: "Avatar",
        width: 90,
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Avatar src={params.row.image.imageUrl} />
          </Box>
        ),
      },
      {
        field: "name",
        headerName: "Name",
        width: 160,
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {params.row.name}
          </Box>
        ),
      },
      {
        field: "age",
        headerName: "Age",
        width: 40,
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {params.row.age}
          </Box>
        ),
      },
      {
        field: "gymName",
        headerName: "Gym",
        width: 100,
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {params.row.gymId.gymName}
          </Box>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        width: 230,
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {params.row.email}
          </Box>
        ),
      },
      {
        field: "experience",
        headerName: "Experience",
        width: 90,
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {params.row.experience} years
          </Box>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created",
        width: 200,
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {dayjs(params.row.createdAt["$date"]).format("DD/MM/YYYY hh:mm A")}
          </Box>
        ),
      },
      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 110,
        type: "boolean",
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            {params.value.toString()}
          </Box>
        ),
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        type: "actions",
        headerAlign: "center",
        renderCell: (params) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <TrainerActions
              {...{
                params,
                selectedRowId,
                setSelectedRowId,
                setRowId,
                refetch,
              }}
            />
          </Box>
        ),
      },
    ],
    [rowId, selectedRowId]
  );

  const [search,setSearch]=useState('')

  useEffect(()=>{
    
    const filtered = trainersData.data.trainers.filter((trainer)=>{
      return trainer.name.toLowerCase().includes(search.toLowerCase())
    })
    setActiveTrainers(filtered)

  },[search])

  return (
    <div>
      <Box
        sx={{
          height: "600",

        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
          }}
        >
          Manage Trainers
        </Typography>

<SearchInput {...{search,setSearch}} />
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
  );
};

export default AdminTrainers;
