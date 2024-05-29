import { fetchTrainertrainerBookings } from '@/api/trainer'
import SearchInput from '@/components/admin/common/SearchInput'
import { Avatar, Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'

const TrainerTrainee = () => {
const [search,setSearch]=useState('')

  const {isLoading,data: trainerBookings}=useQuery({
    queryKey: ['fetchTrainerAlltrainerBookings'],
    queryFn: fetchTrainertrainerBookings,

  })
  console.log('iam trainerBookings',trainerBookings)
  const [rowId,setRowId]=useState<string>('')
  const [selectedRowId,setSelectedRowId]=useState<string>('')
  const [filteredTrainees,setFilteredTrainees] = useState([])


  useEffect(()=>{
    if(trainerBookings){
      setFilteredTrainees(trainerBookings?.data.trainees)
    }
  },[trainerBookings])

  useEffect(()=>{

    const filtered = trainerBookings?.data.trainees.filter((trainee)=>{
      return trainee.userId.username.toLowerCase().includes(search.toLowerCase())
    })

    setFilteredTrainees(filtered)
  },[search])


const columns = useMemo(
  () => [
    {
      field: "profilePic",
      headerName: "Avatar",
      width: 80,
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%" 
        >
          <Avatar
            src={params.row.userId.profilePic.imageUrl}
            style={{ width: "50px", height: "50px" }} 
          />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          {params.row.userId.username}
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          {params.row.userId.email}
        </Box>
      ),
    },
    {
      field: "bookingDate",
      headerName: "Booking Date",
      width: 160,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          {dayjs(params.row.bookingDate).format("DD/MM/YYYY")}
        </Box>
      ),
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      width: 160,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          {dayjs(params.row.expiryDate).format("DD/MM/YYYY")}
        </Box>
      ),
    },
    {
      field: "bookingType",
      headerName: "Booking Type",
      width: 160,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          {params.row.bookingType}
        </Box>
      ),
    },
    {
      field: "amount",
      headerName: "Paid",
      width: 160,
      headerAlign: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          ₹{params.row.amount}
        </Box>
      ),
    },


  ],
  [rowId, selectedRowId]
);
return !isLoading && filteredTrainees ? (
<Container>
    <div className="">
      <Box
        sx={{
          width: "90%",
          mx: 'auto'
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
            color: "white",
          }}
        >
          All Trainees
        </Typography>

        <SearchInput {...{search,setSearch}} />

        <DataGrid
          columns={columns}
          rows={filteredTrainees}
          pageSizeOptions={[5, 10, 25]}
          rowHeight={100}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
          }}
          getRowId={(row) => row._id}
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
  ): <h1>Loading...</h1>
}

export default TrainerTrainee