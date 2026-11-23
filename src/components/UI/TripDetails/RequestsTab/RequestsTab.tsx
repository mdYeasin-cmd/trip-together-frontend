import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import { dataGridHeaderDesign } from "@/constants";
import { RequestAndInviteStatus } from "@/constants/requestAndInviteStatus";
import {
  useAcceptTravelRequestMutation,
  useGetTravelBuddyRequestsQuery,
  useRejectTravelRequestMutation,
} from "@/redux/api/travelBuddiesApi";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";

type TripRequest = {
  id: string;
  userId: string;
  tripId: string;
  name: string;
  user: {
    name: string;
    email: string;
  };
  status: string;
};

const TripDetailsRequestsTab = ({ tripId }: { tripId: string }) => {
  const [acceptAlert, setAcceptAlert] = useState<boolean>(false);
  const [rejectAlert, setRejectAlert] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<TripRequest>({
    id: "",
    userId: "",
    tripId: "",
    name: "",
    user: {
      name: "",
      email: "",
    },
    status: "",
  });

  const { isLoading, data } = useGetTravelBuddyRequestsQuery({ tripId });
  const [acceptTravelRequest] = useAcceptTravelRequestMutation();
  const [rejectTravelRequest] = useRejectTravelRequestMutation();

  const handleRequestAccept = (data: { name: string }) => {
    setAcceptAlert(true);
    setRequestData(data);
  };

  const handleRequestRejct = (data: { name: string }) => {
    setRejectAlert(true);
    setRequestData(data);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        if (row)
          return (
            <>
              <Button sx={{ mr: 2 }} onClick={() => handleRequestAccept(row)}>
                Accept
              </Button>
              <Button onClick={() => handleRequestRejct(row)}>Reject</Button>
            </>
          );
      },
    },
  ];

  if (isLoading) {
    return <>Loading...</>;
  }

  const rows = data?.map((request: TripRequest) => ({
    id: request?.id,
    userId: request?.userId,
    tripId: request?.tripId,
    name: request?.user?.name,
    email: request?.user?.email,
    status: request?.status,
  }));

  console.log(rows, "all rows");

  return (
    <Box>
      <DataGrid rows={rows} columns={columns} sx={dataGridHeaderDesign} />

      <TTAlert
        open={acceptAlert}
        setOpen={setAcceptAlert}
        message={`Are you sure you want to accept ${requestData?.name} as your travel buddy?`}
        onYesClick={async () => {
          try {
            console.log(
              {
                buddyId: requestData?.userId,
                tripId: requestData?.tripId,
                status: RequestAndInviteStatus.ACCEPT,
              },
              "request data test",
            );
            const res = await acceptTravelRequest({
              buddyId: requestData?.userId,
              tripId: requestData?.tripId,
              status: RequestAndInviteStatus.ACCEPT,
            });

            console.log(res, "accept travel reqeust error");

            if (res?.data?.id) {
              toast.success("Travel reqeust accepted successfully.");
              setAcceptAlert(false);
            }
          } catch (error) {
            toast.error("Failed to accept travel request.");
            console.log(error, "accept travel request error");
          }
        }}
      />

      <TTAlert
        open={rejectAlert}
        setOpen={setRejectAlert}
        message={`Are you sure you want to reject ${requestData?.name}'s request to be your travel buddy?`}
        onYesClick={() => {}}
      />
    </Box>
  );
};

export default TripDetailsRequestsTab;
