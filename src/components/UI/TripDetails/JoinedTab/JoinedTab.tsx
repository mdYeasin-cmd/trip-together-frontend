import { dataGridHeaderDesign } from "@/constants";
import { TTravelBuddyRequest } from "@/types";
import { dateFormatter } from "@/utils/dateFormater";
import { Box, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EmptyGridOverlay from "../EmptyGridOverlay/EmptyGridOverlay";

type JoinedRow = {
  id: string;
  name: string;
  email: string;
  type: "Requested" | "Invited";
  createdAt: string;
  joinedAt?: string;
};

type TripDetailsJoinedTabProps = {
  buddies: TTravelBuddyRequest[];
  isLoading: boolean;
};

const columns: GridColDef<JoinedRow>[] = [
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
  {
    field: "type",
    headerName: "Type",
    width: 140,
    renderCell: ({ row }) => (
      <Chip
        size="small"
        label={row.type}
        color={row.type === "Invited" ? "info" : "primary"}
        sx={{ fontWeight: 700 }}
      />
    ),
  },
  {
    field: "createdAt",
    headerName: "Requested / invited on",
    width: 190,
    renderCell: ({ row }) =>
      row.createdAt ? dateFormatter(row.createdAt) : "-",
  },
  {
    field: "joinedAt",
    headerName: "Joined on",
    width: 140,
    renderCell: ({ row }) => (row.joinedAt ? dateFormatter(row.joinedAt) : "-"),
  },
];

const TripDetailsJoinedTab = ({
  buddies,
  isLoading,
}: TripDetailsJoinedTabProps) => {
  const rows: JoinedRow[] = buddies.map((buddy) => ({
    id: buddy.id,
    name: buddy.user?.name ?? "Unknown traveller",
    email: buddy.user?.email ?? "-",
    type: buddy.type === "INVITE" ? "Invited" : "Requested",
    createdAt: buddy.createdAt,
    // A request/invite is only updated once, when it is approved or rejected.
    joinedAt: buddy.updatedAt,
  }));

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        sx={dataGridHeaderDesign}
        slots={{
          noRowsOverlay: () => (
            <EmptyGridOverlay
              title="No one has joined yet"
              subtitle="Travellers appear here once a request or invite is approved."
            />
          ),
        }}
      />
    </Box>
  );
};

export default TripDetailsJoinedTab;
