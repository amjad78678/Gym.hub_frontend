import { updateCoupon, updateTrainer } from "@/api/gym";
import { Check, Delete, Edit, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab, IconButton, Tooltip } from "@mui/material";
import { green } from "@mui/material/colors";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CouponActions = ({
  params,
  selectedRowId,
  setSelectedRowId,
  setRowId,
  refetch,
  setEditOpen,
  setSelectedRow
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { mutate: couponUpdateMutation } = useMutation({
    mutationFn: updateCoupon,
    onSuccess: (res) => {
      console.log(res);
      setSuccess(true);
      setRowId("");
      setSelectedRowId("");
      refetch();
    },
  });

  const handleSubmit = async () => {
    setLoading(true);

    setTimeout(() => {
      const { isBlocked } = params.row;

      try {
        couponUpdateMutation({ isBlocked, _id: params.row._id });
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (selectedRowId === params.row._id && success) setSuccess(false);
  }, [selectedRowId]);

  const handleDelete = async (row: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${row.name} coupon!`,
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
        couponUpdateMutation({ _id: row._id, isDeleted: true });
        toast.success("Trainer deleted successfully");
      }
    });
  };

  const handleEditButton = () => {
    setEditOpen(true);
    setSelectedRow(params.row);
  }

  return (
    <>

      <Box>
        <Tooltip title="Edit this trainer">
          <IconButton onClick={handleEditButton}>
            <Edit />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete this trainer">
          <IconButton onClick={() => handleDelete(params.row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default CouponActions;
