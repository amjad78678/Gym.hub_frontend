import { updateCoupon } from "@/api/gym";
import { Check, Delete, Edit, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab, IconButton, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CouponActions = ({
  params,
  selectedRowId,
  setSelectedRowId,
  setRowId,
  refetch,
  setEditOpen,
  setSelectedRow,
}) => {
  const [success, setSuccess] = useState(false);
  const { mutate: couponUpdateMutation } = useMutation({
    mutationFn: updateCoupon,
    onSuccess: (res) => {
      if (res) {
        setSuccess(true);
        setRowId("");
        setSelectedRowId("");
        refetch();
      }
    },
  });

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
        couponUpdateMutation({ _id: row._id, data: "delete" });
        toast.success("Coupon deleted successfully");
      }
    });
  };

  const handleEditButton = () => {
    setEditOpen(true);
    setSelectedRow(params.row);
  };

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
