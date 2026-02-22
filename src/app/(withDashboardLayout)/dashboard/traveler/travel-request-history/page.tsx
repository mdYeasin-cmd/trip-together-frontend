"use client";

import { dataGridHeaderDesign } from "@/constants";
import { useGetTravelRequestHistroyQuery } from "@/redux/api/travelBuddiesApi";
import { dateFormatter } from "@/utils/dateFormater";
import { Box, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React from "react";

const TravelRequestHistory = () => {
  const router = useRouter();

  const {
    data: travelRequestHistory,
    isLoading: isLoadingTravelRequestHistory,
  } = useGetTravelRequestHistroyQuery(undefined);

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
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: ({ row }) => {
        switch (row?.status) {
          case "APPROVED":
            return <Chip label={`${row?.status}`} color="success" />;

          case "REJECTED":
            return <Chip label={`${row?.status}`} color="error" />;

          default:
            return <Chip label={`${row?.status}`} color="primary" />;
        }
      },
    },
  ];

  if (isLoadingTravelRequestHistory) {
    return <>Loading...</>;
  }

  console.log(travelRequestHistory, "travel request history");

  type rowType = {
    id: string;
    trip: {
      id: string;
      destination: string;
      travelType: string;
      budget: number;
      startDate: Date;
      endDate: Date;
    };
    status: string;
  };

  const rows = travelRequestHistory.map((request: rowType) => {
    return {
      id: request?.id,
      tripId: request?.trip?.id,
      destination: request?.trip?.destination,
      travelType: request?.trip?.travelType,
      budget: request?.trip?.budget,
      startDate: request?.trip?.startDate,
      endDate: request?.trip?.endDate,
      status: request?.status,
    };
  });

  console.log(rows, "rows of travel");

  return (
    <div>
      {!isLoadingTravelRequestHistory ? (
        <Box sx={{ mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={({ row }) => {
              console.log(row, "row click");
              router.push(`/travels/${row?.tripId}`);
            }}
            sx={{
              ...dataGridHeaderDesign,
              "& .MuiDataGrid-row": {
                cursor: "pointer",
              },
            }}
          />
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default TravelRequestHistory;
