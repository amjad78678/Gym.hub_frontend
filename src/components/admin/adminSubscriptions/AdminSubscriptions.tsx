import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions, fetchUsers } from "@/api/admin";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import SearchInput from "../common/SearchInput";

const AdminSubscriptions = () => {
  const {
    isLoading,
    data: subscriptionData,
    refetch,
  } = useQuery({
    queryKey: ["subscriptionData"],
    queryFn: fetchSubscriptions,
  });

  const [subscriptions, setSubscriptions] = useState([]);
  const [rowId, setRowId] = useState<string>("");
  const [selectedRowId, setSelectedRowId] = useState<string>("");

  console.log("iamrowId", rowId);

  useEffect(() => { 
    if (subscriptionData) {
      setSubscriptions(subscriptionData.data.subscriptions);
    }
  }, [subscriptionData]);

const [search,setSearch]=useState('')
  useEffect(()=>{
    const filtered = subscriptionData?.data.subscriptions.filter((subscription)=>{
      return subscription.userId.username.toLowerCase().includes(search.toLowerCase())
    })
    setSubscriptions(filtered)
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
        width: 180,
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.userId.username}
          </Box>
        ),
      },
      {
        field: "subscriptionType",
        headerName: "Subscription",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.subscriptionType}
          </Box>
        ),
      },
      {
        field: "date",
        headerName: "Start Date",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {dayjs(params.row.date).format("DD/MM/YYYY")}
          </Box>
        ),
      },
      {
        field: "expiryDate",
        headerName: "Expiry Date",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {dayjs(params.row.expiryDate).format("DD/MM/YYYY")}
          </Box>
        ),
      },
      {
        field: "price",
        headerName: "Amount",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.price}
          </Box>
        ),
      },
      {
        field: "coupon",
        headerName: "Coupon",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.coupon.isApplied
              ? params.row.coupon.discount
              : "Not Used"}
          </Box>
        ),
      },
      {
        field: "gymName",
        headerName: "Gym",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.gymId.gymName}
          </Box>
        ),
      },
      {
        field: "payment",
        headerName: "Payment",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.paymentType}
          </Box>
        ),
      },
      {
        field: "qrCode",
        headerName: "QR Code",
        headerAlign: "center",
        width: 120,
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" items="center" width="100%">
            <img
              src={params.row.qrCode}
              alt="qrCode"
              style={{ width: "100px", height: "100px" }}
            />
          </Box>
        ),
      },
    ],
    [rowId, selectedRowId]
  );
  const [pageSize, setPageSize] = useState(5);

  return !isLoading && subscriptions ? (
    <div className="">
      <Box
        sx={{
          height: 600,
          width: "100%",
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
          All Subscriptions
        </Typography>

        <SearchInput {...{search,setSearch}} />

        <DataGrid
          columns={columns}
          rows={subscriptions}
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
  ): (<div>Loading...</div>);
};

export default AdminSubscriptions;
