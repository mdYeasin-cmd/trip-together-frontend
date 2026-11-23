import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import { dataGridHeaderDesign } from "@/constants";
import { RequestAndInviteStatus } from "@/constants/requestAndInviteStatus";
import {
  useGetTravelBuddyRequestsQuery,
  useRespondTravelRequestMutation,
} from "@/redux/api/travelBuddiesApi";
import { TTravelBuddyRequest } from "@/types";
import { getRequestStatusChipColor } from "@/utils/chip-color";
import { dateFormatter } from "@/utils/dateFormater";
import { Box, Button, Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";
import EmptyGridOverlay from "../EmptyGridOverlay/EmptyGridOverlay";

type RequestRow = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

type PendingAction = {
  row: RequestRow;
  status: string;
};

const TripDetailsRequestsTab = ({ tripId }: { tripId: string }) => {
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetTravelBuddyRequestsQuery({ tripId });
  const [respondTravelRequest, { isLoading: isResponding }] =
    useRespondTravelRequestMutation();

  const openConfirm = (row: RequestRow, status: string) => {
    setPendingAction({ row, status });
    setAlertOpen(true);
  };

  const handleRespond = async () => {
    if (!pendingAction) return;
    const { row, status } = pendingAction;
    const isAccept = status === RequestAndInviteStatus.ACCEPT;

    const res = await respondTravelRequest({ requestId: row.id, status });

    if (res && "data" in res && res.data) {
      toast.success(
        isAccept
          ? `${row.name} is now your travel buddy.`
          : `${row.name}'s request was rejected.`,
      );
    } else {
      toast.error("Failed to respond to the travel request.");
    }

    setAlertOpen(false);
    setPendingAction(null);
  };

  const rows: RequestRow[] = (data ?? []).map(
    (request: TTravelBuddyRequest) => ({
      id: request.id,
      name: request.user?.name ?? "Unknown traveller",
      email: request.user?.email ?? "-",
      status: request.status,
      createdAt: request.createdAt,
    }),
  );

  const columns: GridColDef<RequestRow>[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
    {
      field: "createdAt",
      headerName: "Requested on",
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
    {
      field: "action",
      headerName: "Action",
      width: 220,
      sortable: false,
      renderCell: ({ row }) =>
        row.status === RequestAndInviteStatus.PENDING ? (
          <Stack direction="row" gap={1}>
            <Button
              size="small"
              disabled={isResponding}
              onClick={() => openConfirm(row, RequestAndInviteStatus.ACCEPT)}
            >
              Accept
            </Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              disabled={isResponding}
              onClick={() => openConfirm(row, RequestAndInviteStatus.REJECT)}
            >
              Reject
            </Button>
          </Stack>
        ) : (
          <Box sx={{ color: "rgba(0,0,0,0.45)" }}>—</Box>
        ),
    },
  ];

  const isAcceptAction =
    pendingAction?.status === RequestAndInviteStatus.ACCEPT;

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
              title="No join requests yet"
              subtitle="When travellers request to join this trip, they will appear here."
            />
          ),
        }}
      />

      <TTAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={
          isAcceptAction
            ? `Are you sure you want to accept ${pendingAction?.row.name} as your travel buddy?`
            : `Are you sure you want to reject ${pendingAction?.row.name}'s request?`
        }
        onYesClick={handleRespond}
      />
    </Box>
  );
};

export default TripDetailsRequestsTab;
