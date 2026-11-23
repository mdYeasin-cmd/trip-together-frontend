"use client";

import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import TTModal from "@/components/Shared/TTModal/TTModal";
import TTTabs from "@/components/Shared/TTTabs/TTTabs";
import { colors } from "@/constants";
import {
  useGetTravelBuddyRequestsQuery,
  useGetTripInvitationsQuery,
  useInviteTravellerMutation,
} from "@/redux/api/travelBuddiesApi";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { IUserData, TTravelBuddyRequest } from "@/types";
import { getInitials } from "@/utils/avatar";
import { getStatusChipColor } from "@/utils/chip-color";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Avatar,
  Box,
  Button,
  Chip,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type InviteTravellerModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tripId: string;
  creatorId: string;
};

// travellerId -> "REQUESTED" | "INVITED" (anyone already linked to this trip)
type LinkedMap = Record<string, string>;

const TravellerRowSkeleton = () => (
  <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Skeleton variant="circular" width={36} height={36} />
        <Box>
          <Skeleton width={160} height={20} />
          <Skeleton width={120} height={16} />
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Skeleton width={78} height={28} />
        <Skeleton width={80} height={32} />
      </Stack>
    </Stack>
  </Paper>
);

type TravellerRowProps = {
  traveller: IUserData;
  linkedAs?: string;
  highlighted?: boolean;
  onInvite: (traveller: IUserData) => void;
};

const TravellerRow = ({
  traveller,
  linkedAs,
  highlighted,
  onInvite,
}: TravellerRowProps) => (
  <Link href={`/travelers/${traveller.id}`}>
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        ...(highlighted && {
          borderColor: "rgba(58,176,162,0.22)",
          backgroundColor: "rgba(255,255,255,0.9)",
        }),
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1.5}
          sx={{ minWidth: 0 }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: colors.SECONDARY,
              fontWeight: 900,
              fontSize: 13,
            }}
          >
            {getInitials(traveller.name || "Traveller")}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={900} noWrap>
              {traveller.name || "Unnamed traveller"}
            </Typography>
            <Typography noWrap sx={{ color: "rgba(0,0,0,0.6)", fontSize: 13 }}>
              {traveller.email || " "}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <Chip
            size="small"
            variant="outlined"
            color={getStatusChipColor(traveller.status)}
            label={traveller.status || "UNKNOWN"}
            sx={{ fontWeight: 900 }}
          />
          <Button
            size="small"
            disabled={Boolean(linkedAs)}
            onClick={(e) => {
              e.preventDefault();
              onInvite(traveller);
            }}
            sx={{ borderRadius: 999, px: 1.5, py: 0.75, fontWeight: 700 }}
          >
            {linkedAs ?? "Invite"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  </Link>
);

const InviteTravellerModal = ({
  open,
  setOpen,
  tripId,
  creatorId,
}: InviteTravellerModalProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<IUserData | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const { data: travellerList, isLoading: isLoadingTravellers } =
    useGetAllUsersQuery(undefined, { skip: !open });
  const { data: requests } = useGetTravelBuddyRequestsQuery(
    { tripId },
    { skip: !open },
  );
  const { data: invitations } = useGetTripInvitationsQuery(
    { tripId },
    { skip: !open },
  );
  const [inviteTraveller, { isLoading: isInviting }] =
    useInviteTravellerMutation();

  const linked = useMemo<LinkedMap>(() => {
    const map: LinkedMap = {};
    (requests ?? []).forEach((r: TTravelBuddyRequest) => {
      map[r.userId] = "Requested";
    });
    (invitations ?? []).forEach((i: TTravelBuddyRequest) => {
      map[i.userId] = "Invited";
    });
    return map;
  }, [requests, invitations]);

  // The trip creator can never invite themselves.
  const candidates: IUserData[] = useMemo(
    () =>
      ((travellerList ?? []) as IUserData[]).filter((t) => t.id !== creatorId),
    [travellerList, creatorId],
  );

  // "AI" picks: placeholder until a real recommendation endpoint exists —
  // shows the first travellers who aren't linked to this trip yet.
  const suggested = useMemo(
    () => candidates.filter((t) => !linked[t.id]).slice(0, 6),
    [candidates, linked],
  );

  const searched = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return candidates;
    return candidates.filter(
      (t) =>
        t.name?.toLowerCase().includes(term) ||
        t.email?.toLowerCase().includes(term),
    );
  }, [candidates, search]);

  const handleInviteClick = (traveller: IUserData) => {
    setSelected(traveller);
    setConfirmOpen(true);
  };

  const handleConfirmInvite = async () => {
    if (!selected || isInviting) return;

    const res = await inviteTraveller({ tripId, buddyId: selected.id });

    if (res && "data" in res && res.data) {
      toast.success(`Invitation sent to ${selected.name}.`);
    } else {
      toast.error("Failed to send the invitation.");
    }

    setConfirmOpen(false);
    setSelected(null);
  };

  const renderList = (
    list: IUserData[],
    skeletonCount: number,
    highlighted: boolean,
  ) => (
    <Box sx={{ maxHeight: { xs: 340, md: 420 }, overflow: "auto", pr: 0.5 }}>
      <Stack gap={1.25}>
        {isLoadingTravellers
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <TravellerRowSkeleton key={`skeleton-${i}`} />
            ))
          : list.map((traveller) => (
              <TravellerRow
                key={traveller.id}
                traveller={traveller}
                linkedAs={linked[traveller.id]}
                highlighted={highlighted}
                onInvite={handleInviteClick}
              />
            ))}

        {!isLoadingTravellers && list.length === 0 && (
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px dashed rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <Typography fontWeight={900}>No travellers found</Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.65)", fontSize: 13 }}>
              Try a different name or email.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );

  return (
    <>
      <TTModal
        open={open}
        setOpen={setOpen}
        title="Invite to join a trip"
        fullWidth={true}
      >
        <Stack gap={2} sx={{ py: 0.5 }}>
          <Box>
            <Typography fontWeight={800} sx={{ fontSize: 14 }}>
              Choose travellers to invite
            </Typography>
            <Typography sx={{ color: "rgba(0,0,0,0.65)", fontSize: 13 }}>
              Switch between AI suggestions and manual search.
            </Typography>
          </Box>

          <TTTabs
            value={activeTab}
            onChange={(v) => setActiveTab(v as number)}
            tabs={[
              {
                label: "AI suggested",
                icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />,
                iconPosition: "start",
              },
              {
                label: "Manual search",
                icon: <ManageSearchRoundedIcon sx={{ fontSize: 18 }} />,
                iconPosition: "start",
              },
            ]}
          />

          {activeTab === 0 && (
            <Stack gap={1.5}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, rgba(58,176,162,0.18) 0%, rgba(53,162,159,0.08) 70%)",
                  border: "1px solid rgba(58,176,162,0.22)",
                }}
              >
                <Typography fontWeight={900} sx={{ lineHeight: 1.15 }}>
                  AI picks for this trip
                </Typography>
                <Typography
                  sx={{ color: "rgba(0,0,0,0.65)", fontSize: 13, mt: 0.5 }}
                >
                  Based on destination, dates, and travel style.
                </Typography>
              </Box>
              {renderList(suggested, 6, true)}
            </Stack>
          )}

          {activeTab === 1 && (
            <Stack gap={1.5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ color: "rgba(0,0,0,0.55)" }} />
                    </InputAdornment>
                  ),
                }}
              />
              {renderList(searched, 8, false)}
            </Stack>
          )}
        </Stack>
      </TTModal>

      <TTAlert
        message={`Are you sure you want to invite ${selected?.name ?? "this traveller"} to join this trip?`}
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onYesClick={handleConfirmInvite}
      />
    </>
  );
};

export default InviteTravellerModal;
