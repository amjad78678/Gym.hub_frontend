import { fetchGymWithId } from "@/api/admin";
import Loader from "@/components/common/Loader";
import {
  Box,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const AdminGymDetails = () => {
  const { id } = useParams();

  const {
    isLoading,
    data: gymData,
    refetch,
  } = useQuery({
    queryKey: ["gymDetails", id as string],
    queryFn: fetchGymWithId,
  });


  return gymData ? (
    <Container>
      <Grid xs={12} sm={12} border={1} borderRadius={2} sx={{ paddingLeft: 0 }}>
        <Box sx={{ width: "100%" }}>
          <Toolbar sx={{ padding: 3, borderBottom: "1px solid grey" }}>
            <div className="flex flex-col">
              <Typography variant="h5">
                {gymData.data.gym[0].gymName}
              </Typography>
              <Typography variant="subtitle2">
                {gymData.data.gym[0].address}
              </Typography>
            </div>
          </Toolbar>

          <Stack width="100%">
            <Box sx={{ width: "100%", px: 2, pt: 2 }}>
              <Grid container spacing={2}>
                {gymData.data.gym[0]?.images?.map((img) => (
                  <Grid item xs={3}>
                    <img src={img.imageUrl} alt="" className="rounded-md" />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Stack>

          <Stack sx={{ px: 4, pt: 2, pb: 4 }}>
            <Typography
              variant="h6"
              component={"span"}
              sx={{
                mt: 2,
                mb: 1,
                fontSize: "18px",
                fontFamily: "serif",
                fontWeight: "400",
                textDecoration: "underline",
              }}
            >
              Gym Details
            </Typography>

            <Stack>
              <div className="flex justify-between">
                <div className="">
                  <p>Business ID : {gymData.data.gym[0].businessId}</p>
                  <p>Gym Name : {gymData.data.gym[0].gymName}</p>
                  <p>Address : {gymData.data.gym[0].address}</p>

                  <h2 className="font-serif underline mt-4 mb-2">
                    Subscription Details
                  </h2>
                  <p>Daily Fee : {gymData.data.gym[0].subscriptions.Daily}</p>
                  <p>
                    Monthly Fee : {gymData.data.gym[0].subscriptions.Monthly}
                  </p>
                  <p>Yearly Fee : {gymData.data.gym[0].subscriptions.Yearly}</p>
                </div>

                <div>
                  <h2 className="font-serif underline mb-2">Contact details</h2>
                  <p>{gymData.data.gym[0].email}</p>
                  <p>{gymData.data.gym[0].contactNumber}</p>
                </div>
              </div>

              <div className="w-full mt-4">
                <h1 className="underline">Description : </h1>
                <p className="my-2 p-3 border border-gray-400">
                  {gymData.data.gym[0].description}
                </p>
              </div>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Container>
  ) : (
    <Loader />
  );
};

export default AdminGymDetails;
