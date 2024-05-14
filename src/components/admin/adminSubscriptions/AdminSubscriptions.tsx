import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchSubscriptions, fetchUsers } from "@/api/admin";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";

const AdminSubscriptions = () => {
  const { isLoading, data: subscriptionData,refetch } = useQuery({
    queryKey: ["subscriptionData"],
    queryFn: fetchSubscriptions,
  });

  const [subscriptions, setSubscriptions] = useState([]);
  const [rowId,setRowId]=useState<string>("")
  const [selectedRowId, setSelectedRowId] = useState<string>("");


  console.log('iamrowId',rowId)
  console.log('iamselectedRowId',selectedRowId)

  useEffect(() => {
    if (subscriptionData) {
        setSubscriptions(subscriptionData.data.subscriptions);
    }
  }, [subscriptionData]);

  console.log("iam subscriptions", subscriptions);


  const columns = useMemo(
    () => [
      {
        field: "profilePic",
        headerName: "Avatar",
        width: 80,
        renderCell: (params) => {
          return <Avatar src={params.row.userId.profilePic} />;
        },
      },
      {
        field: "name",
        headerName: "Name",
        width: 180,
        renderCell: (params) => {
          return <div>{params.row.userId.username}</div>;
        },
      },

      {
        field: "subscriptionType",
        headerName: "Subscription",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => {
            return <div className="text-center">{params.row.subscriptionType}</div>;
          },
      },
      {
        field: "date",
        headerName: "Start Date",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => {
            return <div className="text-center">{dayjs(params.row.date).format("DD/MM/YYYY")}</div>;
          },
      },
      {
        field: "expiryDate",
        headerName: "Expiry Date",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => {
            return <div className="text-center">{dayjs(params.row.expiryDate).format("DD/MM/YYYY")}</div>;
          },
      },
      {
        field: "price",
        headerName: "Amount",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => {
            return <div className="text-center">{params.row.price}</div>;
          },
      },
      {
        field: "coupon",
        headerName: "Coupon",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => {
            return params.row.coupon.isApplied ? <div className="text-center">{params.row.coupon.discount}</div> : (<div className="text-center">Not Used</div>);
          },
      },

      {
        field: "gymName",
        headerName: "Gym",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => {
            return <div className="text-center">{params.row.gymId.gymName}</div>;
          },
         
      },
      {
        field: "payment",
        headerName: "Payment",
        headerAlign: "center",
        width: 100,
        renderCell: (params) => {
            return <div className="text-center">{params.row.paymentType}</div>;
          },
         
      },
   
     

    ],
    [rowId,selectedRowId]
  );

  const [pageSize, setPageSize] = useState(5);

  return (
    <div className="">
      <Box
        sx={{
          height: "600",
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
          Manage Subscriptions
        </Typography>

        <DataGrid
          columns={columns}
          rows={subscriptions}
          pageSizeOptions={[5, 10, 25]}
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
  );
};

export default AdminSubscriptions;
