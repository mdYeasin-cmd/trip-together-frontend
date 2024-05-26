"use client";

import TTForm from "@/components/Forms/TTForm";
import TTInput from "@/components/Forms/TTInput";
import TTModal from "@/components/Shared/TTModal/TTModal";
import { Box, Button, Grid, InputBase, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";

const TravelPostsPage = () => {
  const [opneCreateTripModal, setOpneCreateTripModal] =
    useState<boolean>(false);

  const handlePostSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <Box>
      <Box>
        <Button onClick={() => setOpneCreateTripModal(true)}>
          Create A Trip
        </Button>
        <TTModal
          open={opneCreateTripModal}
          setOpen={setOpneCreateTripModal}
          title="Create a trip"
          fullWidth={true}
        >
          <TTForm onSubmit={handlePostSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TTInput
                  name="destination"
                  label="Destination"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TTInput
                  name="travelType"
                  label="Travel type"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TTInput name="budget" label="Budget" fullWidth={true} />
              </Grid>
              <Grid item xs={6}>
                <TTInput name="startDate" label="Start Date" fullWidth={true} />
              </Grid>
              <Grid item xs={6}>
                <TTInput name="endDate" label="End Date" fullWidth={true} />
              </Grid>
              <Grid item xs={12}>
                <TTInput
                  name="description"
                  label="Description"
                  fullWidth={true}
                  multiline={true}
                  minRows={5}
                />
              </Grid>
            </Grid>
            {/* <Button>Save as draft</Button> */}{" "}
            {/* Will think about the feature */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button sx={{ mt: 2 }}>Create</Button>
            </Box>
          </TTForm>
        </TTModal>
      </Box>
    </Box>
  );
};

export default TravelPostsPage;
