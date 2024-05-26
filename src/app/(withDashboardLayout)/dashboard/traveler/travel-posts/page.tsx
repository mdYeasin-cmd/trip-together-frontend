"use client";

import TTFileUploader from "@/components/Forms/TTFileUploader";
import TTForm from "@/components/Forms/TTForm";
import TTInput from "@/components/Forms/TTInput";
import TTModal from "@/components/Shared/TTModal/TTModal";
import { colors } from "@/constants";
import { Box, Button, Grid, InputBase, Stack, TextField } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";

const TravelPostsPage = () => {
  const [opneCreateTripModal, setOpneCreateTripModal] =
    useState<boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);

  console.log(files, "files here");

  const handlePostSubmit = (values: FieldValues) => {
    console.log(values, "form values");
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
                <Stack justifyContent={"center"} flexDirection={"row"}>
                  <TTFileUploader
                    name="files"
                    label="Upload Photo"
                    multiple={true}
                    setFiles={setFiles}
                  />
                </Stack>
              </Grid>
              {files && (
                <Grid item xs={12}>
                  <Stack
                    flexDirection={"row"}
                    gap={1}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                  >
                    {files &&
                      Array.from(files)?.map((file, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{ border: `1px solid ${colors.LIGHTGRAY}` }}
                          >
                            <Image
                              alt={"preview travel image"}
                              src={URL.createObjectURL(file)}
                              width={100}
                              height={100}
                              style={{ display: "block" }}
                            />
                          </Box>
                        );
                      })}
                  </Stack>
                </Grid>
              )}
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
            <Stack flexDirection={"row"} justifyContent={"center"}>
              <Button type="submit" sx={{ mt: 2 }}>
                Create
              </Button>
            </Stack>
          </TTForm>
        </TTModal>
      </Box>
    </Box>
  );
};

export default TravelPostsPage;
