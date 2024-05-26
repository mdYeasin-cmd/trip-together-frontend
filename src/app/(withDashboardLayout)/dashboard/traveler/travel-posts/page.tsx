"use client";

import TTDatePicker from "@/components/Forms/TTDatePicker";
import TTFileUploader from "@/components/Forms/TTFileUploader";
import TTForm from "@/components/Forms/TTForm";
import TTInput from "@/components/Forms/TTInput";
import TTSelect from "@/components/Forms/TTSelect";
import TTModal from "@/components/Shared/TTModal/TTModal";
import { colors } from "@/constants";
import { travelTypes } from "@/constants/trip.constant";
import imgbbImageUploader from "@/helpers/imgbb/imgbbImageUploader";
import { useCreateATripMutation } from "@/redux/api/tripsApi";
import { Box, Button, Grid, Stack } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const TravelPostsPage = () => {
  const [opneCreateTripModal, setOpneCreateTripModal] =
    useState<boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isCreateButtonClick, setIsCreateButtonClick] =
    useState<boolean>(false);

  // redux hanlde
  const [createATrip] = useCreateATripMutation();

  const handlePostSubmit = async (values: FieldValues) => {
    setIsCreateButtonClick(true);
    const toastId = toast.loading("Please wait...");
    try {
      if (!values?.files?.length) {
        toast.error("Please upload at least 1 image.", { id: toastId });
        setIsCreateButtonClick(false);
        return;
      }

      const { files, ...createTripData } = values;
      const fileList = Array.from(files);

      const photoPromises = fileList.map((file) => {
        return imgbbImageUploader(file as Blob);
      });

      const photoList = await Promise.all(photoPromises);

      createTripData.photos = photoList.map(
        (photo) => photo?.data?.data?.display_url
      );
      createTripData.budget = Number(createTripData.budget);

      const res = await createATrip(createTripData);

      if (res?.data?.id) {
        toast.success("Trip is created successfully.", { id: toastId });
        setOpneCreateTripModal(false);
      }
    } catch (error) {
      toast.error("Trip creation failed!", { id: toastId });
      setIsCreateButtonClick(false);
      console.log(error);
    }
  };

  return (
    <Box>
      <Box>
        <Button onClick={() => setOpneCreateTripModal(true)}>
          Create A Trip
        </Button>

        {/* Create a trip modal */}
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
                <TTSelect
                  name="travelType"
                  items={travelTypes}
                  label="Travel Type"
                />
              </Grid>
              <Grid item xs={6}>
                <TTInput name="budget" label="Budget" fullWidth={true} />
              </Grid>
              <Grid item xs={6}>
                <TTDatePicker name="startDate" label="Start Date" />
              </Grid>
              <Grid item xs={6}>
                <TTDatePicker name="endDate" label="End Date" />
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
              <Button
                type="submit"
                sx={{ mt: 2 }}
                disabled={isCreateButtonClick}
              >
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
