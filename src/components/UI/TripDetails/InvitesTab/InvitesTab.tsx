import { dataGridHeaderDesign } from "@/constants";
import { useGetTripInvitationsQuery } from "@/redux/api/travelBuddiesApi";
import { TTravelBuddyRequest } from "@/types";
import { getRequestStatusChipColor } from "@/utils/chip-color";
import { dateFormatter } from "@/utils/dateFormater";
import { Box, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EmptyGridOverlay from "../EmptyGridOverlay/EmptyGridOverlay";

type InviteRow = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

const TripDetailsInvitesTab = ({ tripId }: { tripId: string }) => {
  const { data, isLoading } = useGetTripInvitationsQuery({ tripId });

  const rows: InviteRow[] = (data ?? []).map(
    (invite: TTravelBuddyRequest) => ({
      id: invite.id,
      name: invite.user?.name ?? "Unknown traveller",
      email: invite.user?.email ?? "-",
      status: invite.status,
      createdAt: invite.createdAt,
    }),
  );

  const columns: GridColDef<InviteRow>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
    {
      field: "createdAt",
      headerName: "Invited on",
      width: 150,
      renderCell: ({ row }) => (row.createdAt ? dateFormatter(row.createdAt) : "-"),
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.status}
          color={getRequestStatusChipColor(row.status)}
          sx={{ fontWeight: 700 }}
        />
      ),
    },
  ];

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
              title="No invitations sent"
              subtitle="Use “Invite traveller” to invite people to this trip."
            />
          ),
        }}
      />
    </Box>
  );
};

export default TripDetailsInvitesTab;
