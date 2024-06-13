import { updateUserAction } from "@/api/admin";
import { Check, Delete, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab, IconButton, Tooltip } from "@mui/material";
import { green } from "@mui/material/colors";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UsersActions = ({
  params,
  selectedRowId,
  setSelectedRowId,
  setRowId,
  refetch
}) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate: updateUserActions } = useMutation({
    mutationFn: updateUserAction,
    onSuccess: (res) => {
      if(res?.data.success){
        toast.success(res.data.message);
        refetch();
      }
      setSuccess(true);
      setRowId("");
      setSelectedRowId("");
    },
  });

  useEffect(() => {
    if (selectedRowId === params.row._id && success === true) setSuccess(false);
  }, [selectedRowId]);

  
  const handleSubmit = async () => {
    setLoading(true);

    setTimeout(() => {
      try {
        const { isDeleted, isBlocked, _id } = params.row;
        updateUserActions({ id: _id, isBlocked, isDeleted });
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };


  const handleDelete = async (row: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${row.name} user!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, cancel!",
      customClass: {
        container: "custom-swal-container",
      },
      width: 400, 
      background: "#f0f0f0",
      iconHtml: '<i class="bi bi-trash" style="font-size:30px"></i>',
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateUserActions({ id: row._id, isDeleted: true ,isBlocked: row.isBlocked});
      }
    });
  };

  return (
    <>
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": {
              bgcolor: green[700],
            },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.row._id != selectedRowId}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}

      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>

    <Box sx={{ mt: 1 }}>

<Tooltip title="Delete this trainer">
          <IconButton onClick={() => handleDelete(params.row)}>
            <Delete />
          </IconButton>
        </Tooltip>
    </Box>
    </>
  );
};

export default UsersActions;
