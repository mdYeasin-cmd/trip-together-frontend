"use client";

import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import TripDetailsSkeleton from "@/components/Skeletons/TripDetailsSkeleton";
import InviteTravellerModal from "@/components/UI/TripDetails/InviteTravellerModal/InviteTravellerModal";
import TripDetailsOverviewTab from "@/components/UI/TripDetails/OverviewTab/OverviewTab";
import { colors } from "@/constants";
import {
  useGetRequestEligibilityQuery,
  useRequestToJoinMutation,
} from "@/redux/api/buddyRequestApi";
import { useGetATripQuery } from "@/redux/api/tripsApi";
import { getUserInfo } from "@/services/auth.service";
import { TTrip } from "@/types";
import { redirectToLogin } from "@/utils/redirect";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TripDetailsPage = ({ params }: { params: { tripId: string } }) => {
  const { tripId } = params;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [requestToJoinModal, setRequestToJoinModal] = useState<boolean>(false);
  const [inviteToJoin, setInviteToJoin] = useState<boolean>(false);

  const userInfo = getUserInfo();

  const { data: tripDetails, isLoading } = useGetATripQuery(tripId);
  const isTripCreator = Boolean(
    userInfo?.id && userInfo.id === (tripDetails as TTrip | undefined)?.userId,
  );

  // Only a logged-in traveller who isn't the creator can request to join.
  const { data: requestEligibility } = useGetRequestEligibilityQuery(
    { tripId },
    { skip: !userInfo?.id || isLoading || isTripCreator },
  );
  const [requestToJoin] = useRequestToJoinMutation();

  const handleRequestToJoin = async () => {
    const res = await requestToJoin({ tripId, userId: userInfo?.id });

    if (res && "data" in res && res.data?.id) {
      toast.success("Request sent successfully.");
    } else {
      toast.error("Failed to send trip request.");
    }
    setRequestToJoinModal(false);
  };

  if (isLoading) {
    return <TripDetailsSkeleton />;
  }

  const trip = tripDetails as TTrip;
  const { userId, destination } = trip;

  const renderAction = () => {
    if (isTripCreator) {
      return (
        <Button onClick={() => setInviteToJoin(true)}>invite to join</Button>
      );
    }

    if (requestEligibility?.eligible === false) {
      const kind = requestEligibility.type === "INVITE" ? "INVITE" : "REQUEST";
      return (
        <Chip
          label={`${kind} ${requestEligibility.status}`}
          color="primary"
          variant="outlined"
        />
      );
    }

    return (
      <Button
        onClick={() => {
          if (!userInfo?.id) {
            redirectToLogin(router, pathname, searchParams);
            return;
          }
          setRequestToJoinModal(true);
        }}
      >
        request to join
      </Button>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#c4e7e3",
          borderBottom: "1px solid #c4e7e3",
        }}
      >
        <Container>
          <Stack
            py={{ xs: 3, md: 5 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Box>
              <LocationOnRoundedIcon
                sx={{
                  color: colors.SECONDARY,
                  fontSize: { xs: 28, md: 34 },
                }}
              />
              <Typography
                variant="h4"
                component="h1"
                fontWeight={800}
                sx={{ lineHeight: 1.1 }}
              >
                {destination || "Trip Details"}
              </Typography>
            </Box>
            <Box>{renderAction()}</Box>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ mt: { xs: 3, md: 5 } }}>
        <TripDetailsOverviewTab trip={trip} />
      </Container>

      <TTAlert
        message={`Are you sure you want to join this trip?`}
        open={requestToJoinModal}
        setOpen={setRequestToJoinModal}
        onYesClick={handleRequestToJoin}
      />

      {isTripCreator && (
        <InviteTravellerModal
          open={inviteToJoin}
          setOpen={setInviteToJoin}
          tripId={tripId}
          creatorId={userId}
        />
      )}
    </Box>
  );
};

export default TripDetailsPage;
