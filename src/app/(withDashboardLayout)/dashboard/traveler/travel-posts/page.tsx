"use client";

import TTDatePicker from "@/components/Forms/TTDatePicker";
import TTFileUploader from "@/components/Forms/TTFileUploader";
import TTForm from "@/components/Forms/TTForm";
import TTInput from "@/components/Forms/TTInput";
import TTSelect from "@/components/Forms/TTSelect";
import TTModal from "@/components/Shared/TTModal/TTModal";
import { colors, dataGridHeaderDesign } from "@/constants";
import { travelTypes } from "@/constants/trip.constant";
import imgbbImageUploader from "@/helpers/imgbb/imgbbImageUploader";
import {
  useCreateATripMutation,
  useDeleteATripMutation,
  useGetAllTripsQuery,
} from "@/redux/api/tripsApi";
import { Box, Button, Grid, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dateFormatter } from "@/utils/dateFormater";
import DeleteIcon from "@mui/icons-material/Delete";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

const createATripValidationSchema = z.object({
  files: z.custom<FileList>().superRefine((files, ctx) => {
    if (!(files instanceof FileList)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        message: "At least one photo is required",
      });

      return z.NEVER;
    }
  }),
  destination: z.string({
    required_error: "Destination is required.",
    invalid_type_error: "Destination must be a string.",
  }),
  travelType: z.string({
    required_error: "Travel type is required.",
    invalid_type_error: "Travel type must be a string.",
  }),
  budget: z.string({
    required_error: "Budget is required",
    invalid_type_error: "Budget must be a number.",
  }),
  startDate: z.string({
    required_error: "Start date is required",
  }),
  endDate: z.string({
    required_error: "End date is required",
  }),
  description: z.string({
    required_error: "Description is required.",
    invalid_type_error: "Description must be a string.",
  }),
});

const defaultValues = {
  files: "",
  destination: "",
  travelType: "",
  budget: "",
  startDate: dayjs(new Date().toDateString()),
  endDate: dayjs(new Date().toDateString()),
  description: "",
};

const TravelPostsPage = () => {
  const [opneCreateTripModal, setOpneCreateTripModal] =
    useState<boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isCreateButtonClick, setIsCreateButtonClick] =
    useState<boolean>(false);

  // redux consume
  const [createATrip] = useCreateATripMutation();
  const { data, isLoading } = useGetAllTripsQuery({});
  const [deleteATrip] = useDeleteATripMutation();

  const handlePostSubmit = async (values: FieldValues) => {
    console.log(values, "Submit values");
    setIsCreateButtonClick(true);
    const toastId = toast.loading("Please wait...");
    try {
      console.log(values, "Submit values");

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
        setFiles(null);
        setIsCreateButtonClick(false);
      }
    } catch (error) {
      toast.error("Trip creation failed!", { id: toastId });
      setIsCreateButtonClick(false);
      console.log(error);
    }
  };

  const handlePostDelete = async (id: string) => {
    try {
      const res = await deleteATrip(id);

      if (res?.data?.id) {
        toast.success("Trip is deleted successfully.");
      }
    } catch (error) {
      toast.error("Trip delete process failed!");
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "destination",
      headerName: "Destination",
      width: 300,
    },
    {
      field: "travelType",
      headerName: "Travel Type",
      width: 250,
    },
    {
      field: "budget",
      headerName: "Budget",
      width: 250,
      renderCell: ({ row }) => {
        return <Box>{`${row?.budget} Tk`}</Box>;
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 250,
      renderCell: ({ row }) => {
        return <Box>{dateFormatter(row?.startDate)}</Box>;
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 250,
      renderCell: ({ row }) => {
        return <Box>{dateFormatter(row?.endDate)}</Box>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <IconButton
            onClick={() => handlePostDelete(row.id)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Box>
        <Button onClick={() => setOpneCreateTripModal(true)}>
          Create A Trip
        </Button>

        {!isLoading ? (
          <Box sx={{ mt: 2 }}>
            <DataGrid
              rows={data?.data}
              columns={columns}
              sx={dataGridHeaderDesign}
            />
          </Box>
        ) : (
          <h1>Loading...</h1>
        )}

        {/* Create a trip modal */}
        <TTModal
          open={opneCreateTripModal}
          setOpen={setOpneCreateTripModal}
          title="Create a trip"
          fullWidth={true}
        >
          <TTForm
            onSubmit={handlePostSubmit}
            // resolver={zodResolver(createATripValidationSchema)}
            defaultValues={defaultValues}
          >
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
                <TTInput
                  name="budget"
                  label="Budget"
                  fullWidth={true}
                  type="number"
                />
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
                  label="Description (At least 200 characters)"
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
                onClick={() => {
                  console.log("create button clicked");
                }}
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
