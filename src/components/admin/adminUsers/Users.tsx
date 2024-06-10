import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import UsersActions from "./UsersActions";
import SearchInput from "../common/SearchInput";
import Loader from "@/components/common/Loader";

const Users = ({ usersData, refetch }) => {
  const [rowId, setRowId] = useState<string>("");
  const [selectedRowId, setSelectedRowId] = useState<string>("");
  const [activeUsers, setActiveUsers] = useState([]);
  console.log("iamrowId", rowId);
  console.log("iamselectedRowId", selectedRowId);

  useEffect(() => {
    if (usersData) {
      setActiveUsers(usersData.data.message.filter((user) => !user.isDeleted));
    }
  }, [usersData]);

  console.log("iam active users", activeUsers);

  const columns: any = useMemo(
    () => [
      {
        field: "photoUrl",
        headerName: "Avatar",
        width: 90,
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            <Avatar src={params.row.profilePic.imageUrl} />
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
            {params.row.username}
          </Box>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.email}
          </Box>
        ),
      },
      {
        field: "mobileNumber",
        headerName: "Mobile number",
        width: 150,
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {params.row.mobileNumber}
          </Box>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created",
        width: 200,
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            {dayjs(params.row.createdAt).format("DD/MM/YYYY hh:mm A")}
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
          <Box display="flex" justifyContent="center" width="100%">
            {params.value.toString()}
          </Box>
        ),
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" justifyContent="center" width="100%">
            <UsersActions
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

  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtered = usersData.data.message.filter((item) => {
      return item.username.toLowerCase().includes(search.toLowerCase());
    });

    setActiveUsers(filtered);
  }, [search]);

  const [pageSize, setPageSize] = useState(5);

  return (
    <div className="">
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
          Manage Users
        </Typography>
        <SearchInput {...{ search, setSearch }} />
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
            width: "100%",
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

export default Users;
