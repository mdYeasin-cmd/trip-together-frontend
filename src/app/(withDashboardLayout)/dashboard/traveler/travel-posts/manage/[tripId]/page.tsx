"use client";

import TTTabs from "@/components/Shared/TTTabs/TTTabs";
import InviteTravellerModal from "@/components/UI/TripDetails/InviteTravellerModal/InviteTravellerModal";
import TripDetailsInvitesTab from "@/components/UI/TripDetails/InvitesTab/InvitesTab";
import TripDetailsRequestsTab from "@/components/UI/TripDetails/RequestsTab/RequestsTab";
import { colors } from "@/constants";
import {
  useGetTravelBuddyRequestsQuery,
  useGetTripInvitationsQuery,
} from "@/redux/api/travelBuddiesApi";
import { useGetATripQuery } from "@/redux/api/tripsApi";
import { getUserInfo } from "@/services/auth.service";
import { TTrip } from "@/types";
import { dateFormatter } from "@/utils/dateFormater";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MailIcon from "@mui/icons-material/Mail";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  Button,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const ManageTravelPostPage = ({ params }: { params: { tripId: string } }) => {
  const { tripId } = params;
  const userInfo = getUserInfo();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);

  const { data: tripData, isLoading } = useGetATripQuery(tripId);
  const trip = tripData as TTrip | undefined;
  const isOwner = Boolean(trip && userInfo?.id === trip.userId);

  // Counts for the tab labels (shared cache with the tab tables).
  const { data: requests } = useGetTravelBuddyRequestsQuery(
    { tripId },
    { skip: !isOwner },
  );
  const { data: invitations } = useGetTripInvitationsQuery(
    { tripId },
    { skip: !isOwner },
  );

  if (isLoading) {
    return (
      <Stack gap={2}>
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" height={48} width={320} />
        <Skeleton variant="rounded" height={300} />
      </Stack>
    );
  }

  if (!trip || !isOwner) {
    return (
      <Paper sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={800}>
          You can only manage your own posts
        </Typography>
        <Typography sx={{ color: "rgba(0,0,0,0.6)", mt: 1, mb: 2 }}>
          This trip doesn&apos;t exist or wasn&apos;t created by you.
        </Typography>
        <Button component={Link} href="/dashboard/traveler/travel-posts">
          Back to my posts
        </Button>
      </Paper>
    );
  }

  const requestCount = requests?.length ?? 0;
  const pendingRequestCount =
    requests?.filter((r: { status: string }) => r.status === "PENDING")
      .length ?? 0;
  const inviteCount = invitations?.length ?? 0;

  return (
    <Stack gap={3}>
      <Box>
        <Button
          component={Link}
          href="/dashboard/traveler/travel-posts"
          variant="text"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ px: 0 }}
        >
          My travel posts
        </Button>
      </Box>

      {/* Trip summary */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        {trip.photos?.[0] && (
          <Box
            component="img"
            src={trip.photos[0]}
            alt={trip.destination}
            sx={{
              width: { xs: "100%", sm: 120 },
              height: { xs: 160, sm: 84 },
              objectFit: "cover",
              borderRadius: 1.5,
              flexShrink: 0,
            }}
          />
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" fontWeight={800} noWrap>
            {trip.destination}
          </Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
            <Chip
              size="small"
              label={`${dateFormatter(trip.startDate)} – ${dateFormatter(trip.endDate)}`}
            />
            <Chip size="small" label={`${trip.budget} Tk`} />
            <Chip size="small" label={trip.travelType} />
          </Stack>
        </Box>
        <Button
          component={Link}
          href={`/travels/${trip.id}`}
          variant="outlined"
          endIcon={<OpenInNewRoundedIcon />}
          sx={{ color: colors.SECONDARY, flexShrink: 0 }}
        >
          View public post
        </Button>
      </Paper>

      {/* Requests / Invites */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={2}
      >
        <TTTabs
          value={activeTab}
          onChange={(v) => setActiveTab(v as number)}
          tabs={[
            {
              label: `Requests (${requestCount})${pendingRequestCount ? ` · ${pendingRequestCount} new` : ""}`,
              icon: <PersonAddIcon sx={{ fontSize: 18 }} />,
              iconPosition: "start",
            },
            {
              label: `Invites (${inviteCount})`,
              icon: <MailIcon sx={{ fontSize: 18 }} />,
              iconPosition: "start",
            },
          ]}
        />
        <Button
          startIcon={<PersonAddIcon />}
          onClick={() => setInviteOpen(true)}
        >
          Invite traveller
        </Button>
      </Stack>

      {activeTab === 0 && <TripDetailsRequestsTab tripId={tripId} />}
      {activeTab === 1 && <TripDetailsInvitesTab tripId={tripId} />}

      <InviteTravellerModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        tripId={tripId}
        creatorId={trip.userId}
      />
    </Stack>
  );
};

export default ManageTravelPostPage;
