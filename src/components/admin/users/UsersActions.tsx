import { updateUserAction } from "@/api/admin";
import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const UsersActions = ({
  params,
  selectedRowId,
  setSelectedRowId,
  setRowId,
}) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("iam selectedrow", selectedRowId);

  const { mutate: updateUserActions } = useMutation({
    mutationFn: updateUserAction,
    onSuccess: (res) => {
      console.log(res);
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
        console.log("iamparamsrow", params.row);
        console.log(isDeleted, isBlocked, _id);
        updateUserActions({ id: _id, isBlocked, isDeleted });
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
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
  );
};

export default UsersActions;
