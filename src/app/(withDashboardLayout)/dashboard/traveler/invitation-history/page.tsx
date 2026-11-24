"use client";

import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import EmptyGridOverlay from "@/components/UI/TripDetails/EmptyGridOverlay/EmptyGridOverlay";
import { dataGridHeaderDesign } from "@/constants";
import { RequestAndInviteStatus } from "@/constants/requestAndInviteStatus";
import {
  useGetInvitationHistroyQuery,
  useRespondInvitationMutation,
} from "@/redux/api/buddyInvitationApi";
import { TTravelBuddyRequest, TTrip } from "@/types";
import { getRequestStatusChipColor } from "@/utils/chip-color";
import { dateFormatter } from "@/utils/dateFormater";
import { Box, Button, Chip, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TInvitation = TTravelBuddyRequest & {
  trip?: Pick<
    TTrip,
    "id" | "destination" | "travelType" | "budget" | "startDate" | "endDate"
  >;
};

type InvitationRow = {
  id: string;
  tripId: string;
  destination: string;
  travelType: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  status: string;
};

type PendingAction = {
  row: InvitationRow;
  status: string;
};

const InvitationHistory = () => {
  const router = useRouter();

  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetInvitationHistroyQuery(undefined);
  const [respondInvitation, { isLoading: isResponding }] =
    useRespondInvitationMutation();

  const openConfirm = (row: InvitationRow, status: string) => {
    setPendingAction({ row, status });
    setAlertOpen(true);
  };

  const handleRespond = async () => {
    if (!pendingAction || isResponding) return;
    const { row, status } = pendingAction;

    const res = await respondInvitation({
      invitationId: row.id,
      tripId: row.tripId,
      status,
    });

    if (res && "data" in res && res.data) {
      toast.success(
        status === RequestAndInviteStatus.ACCEPT
          ? `You joined the trip to ${row.destination}.`
          : `You rejected the invitation to ${row.destination}.`,
      );
    } else {
      toast.error("Failed to respond to the invitation.");
    }

    // pendingAction is kept so the message doesn't change while the dialog fades out.
    setAlertOpen(false);
  };

  const rows: InvitationRow[] = (data ?? []).map((invitation: TInvitation) => ({
    id: invitation.id,
    tripId: invitation.tripId,
    destination: invitation.trip?.destination ?? "Unknown trip",
    travelType: invitation.trip?.travelType ?? "-",
    budget: invitation.trip?.budget,
    startDate: invitation.trip?.startDate,
    endDate: invitation.trip?.endDate,
    createdAt: invitation.createdAt,
    status: invitation.status,
  }));

  const columns: GridColDef<InvitationRow>[] = [
    { field: "destination", headerName: "Destination", flex: 1, minWidth: 160 },
    { field: "travelType", headerName: "Travel Type", width: 130 },
    {
      field: "budget",
      headerName: "Budget",
      width: 120,
      renderCell: ({ row }) =>
        row.budget === undefined ? "-" : `${row.budget} Tk`,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
      renderCell: ({ row }) =>
        row.startDate ? dateFormatter(row.startDate) : "-",
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
      renderCell: ({ row }) => (row.endDate ? dateFormatter(row.endDate) : "-"),
    },
    {
      field: "createdAt",
      headerName: "Invited on",
      width: 120,
      renderCell: ({ row }) =>
        row.createdAt ? dateFormatter(row.createdAt) : "-",
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
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
          // Keep button clicks (disabled ones too) from opening the trip.
          <Stack direction="row" gap={1} onClick={(e) => e.stopPropagation()}>
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
    <Box sx={{ mt: 2 }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        onRowClick={({ row }) => router.push(`/travels/${row.tripId}`)}
        sx={{
          ...dataGridHeaderDesign,
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
        }}
        slots={{
          noRowsOverlay: () => (
            <EmptyGridOverlay
              title="No invitations yet"
              subtitle="When someone invites you to a trip, it will appear here."
            />
          ),
        }}
      />

      <TTAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={`Are you sure you want to ${isAcceptAction ? "accept" : "reject"} the invitation to ${pendingAction?.row.destination}?`}
        onYesClick={handleRespond}
      />
    </Box>
  );
};

export default InvitationHistory;
