import { Container } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import TrainerActions from "./TrainerActions";
import { fetchTrainers } from "@/api/gym";
import AddTrainerModal from "./AddTrainerModal";
import CouponActions from "./CouponActions";
import NoCouponComponent from "./NoCouponComponent";
import SearchInput from "@/components/admin/common/SearchInput";
import Loader from "@/components/common/Loader";

const GymCoupon = ({
  setOpen,
  setEditOpen,
  coupons,
  refetch,
  setSelectedRow,
  isLoading,
}) => {
  const [activeCoupons, setActiveCoupons] = useState([]);
  useEffect(() => {
    if (coupons) {
      setActiveCoupons(coupons.filter((coupon) => !coupon.isDeleted));
    }
  }, [coupons]);

  const [rowId, setRowId] = useState<string>("");
  const [selectedRowId, setSelectedRowId] = useState<string>("");

  console.log("iamrowId", rowId);
  console.log("iamselectedRowId", selectedRowId);

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Coupon",
        width: 140,
      },
      {
        field: "description",
        headerName: "Description",
        width: 220,
      },

      {
        field: "minPrice",
        headerName: "Min. Price",
        width: 120,
      },
      {
        field: "discount",
        headerName: "Discount",
        width: 120,
      },
      {
        field: "startingDate",
        headerName: "Starting date",
        width: 150,
        renderCell: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      },
      {
        field: "endingDate",
        headerName: "Ending date",
        width: 150,
        renderCell: (params) => dayjs(params.value).format("DD/MM/YYYY"),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => (
          <CouponActions
            {...{
              params,
              setSelectedRow,
              setEditOpen,
              selectedRowId,
              setSelectedRowId,
              setRowId,
              refetch,
            }}
          />
        ),
      },
    ],
    [rowId, selectedRowId]
  );

  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtered = coupons.filter((coupon) => {
      return coupon.name.toLowerCase().includes(search.toLowerCase());
    });

    setActiveCoupons(filtered);
  }, [search]);

  return isLoading || !coupons ? (
    <Loader />
  ) : coupons.length < 1 ? (
    <NoCouponComponent {...{ setOpen }} />
  ) : (
    <Container>
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
              color: "white",
              mt: 3,
              mb: 3,
            }}
          >
            Manage Coupons
          </Typography>

          <div className="flex justify-between">
            <SearchInput {...{ search, setSearch }} />
            <Button sx={{ color: "yellow" }} onClick={() => setOpen(true)}>
              Add Coupon
            </Button>
          </div>

          <DataGrid
            columns={columns}
            rows={activeCoupons}
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
    </Container>
  );
};

export default GymCoupon;
