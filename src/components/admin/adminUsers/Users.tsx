import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/admin";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import UsersActions from "./UsersActions";

const Users = () => {
  const { isLoading, data: usersData,refetch } = useQuery({
    queryKey: ["usersData"],
    queryFn: fetchUsers,
  });

  const [users, setUsers] = useState([]);
  const [rowId,setRowId]=useState<string>("")
  const [selectedRowId, setSelectedRowId] = useState<string>("");


  console.log('iamrowId',rowId)
  console.log('iamselectedRowId',selectedRowId)

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.data.message);
    }
  }, [usersData]);

  console.log(users);
  const activeUsers = users.filter((user) => !user.isDeleted);


  const columns = useMemo(
    () => [
      {
        field: "photoUrl",
        headerName: "Avatar",
        width: 90,
        renderCell: (params) => {
          return <Avatar src={params.row.profilePic} />;
        },
      },
      {
        field: "name",
        headerName: "Name",
        width: 180,
        renderCell: (params) => {
          return <div>{params.row.username}</div>;
        },
      },

      {
        field: "email",
        headerName: "Email",
        width: 250,
      },
      {
        field: "mobileNumber",
        headerName: "Mobile number",
        width: 130,
      },

      {
        field: "createdAt",
        headerName: "Created",
        width: 200,
        renderCell: (params) =>
          dayjs(params.row.createdAt).format("DD/MM/YYYY hh:mm A"),
      },
   
      {
        field: "isBlocked",
        headerName: "Blocked",
        width: 110,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions", 
        renderCell: (params) => (
          <UsersActions {...{params,selectedRowId,setSelectedRowId,setRowId,refetch}} />
        )
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
          Manage Users
        </Typography>

        <DataGrid
          columns={columns}
          rows={activeUsers}
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

export default Users;
