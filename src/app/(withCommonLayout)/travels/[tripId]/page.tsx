"use client";

import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import TTModal from "@/components/Shared/TTModal/TTModal";
import TripDetailsSkeleton from "@/components/Skeletons/TripDetailsSkeleton";
import TripDetailsCreatorTabs from "@/components/UI/TripDetails/CreatorTabs/CreatorTabs";
import TripDetailsOverviewTab from "@/components/UI/TripDetails/OverviewTab/OverviewTab";
import { colors } from "@/constants";
import {
  useGetRequestEligibilityQuery,
  useRequestToJoinMutation,
} from "@/redux/api/travelBuddiesApi";
import { useGetATripQuery } from "@/redux/api/tripsApi";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import { IUserData, TTrip } from "@/types";
import { getInitials } from "@/utils/avatar";
import { getStatusChipColor } from "@/utils/chip-color";
import { redirectToLogin } from "@/utils/redirect";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TTTabs from "@/components/Shared/TTTabs/TTTabs";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
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
  const [activeInviteTab, setActiveInviteTab] = useState<number>(0);
  const [inviteAlert, setInviteAlert] = useState<boolean>(false);

  const userInfo = getUserInfo();

  const { data: requestEligibility, isLoading: isRequestEligibilityLoading } =
    useGetRequestEligibilityQuery({
      tripId: tripId,
    });
  const { data: tripDetails, isLoading } = useGetATripQuery(tripId);
  const { data: travellerList, isLoading: isLoadingTravellers } =
    useGetAllUsersQuery(undefined);
  const [requestToJoin] = useRequestToJoinMutation();

  const handleRequestToJoin = async (tripId: string, userId: string) => {
    try {
      const res = await requestToJoin({
        tripId,
        userId,
      });

      if (res?.data?.id) {
        toast.success("Requst sent successfully.");
        setRequestToJoinModal(false);
      }
    } catch (error) {
      toast.error("Failed to sent trip request.");
      console.log(error, "request to join error");
    }
  };

  const handleInviteToJoin = (): void => {
    console.log("Invite to join");

    setInviteToJoin(false);
  };

  const handleInviteAlert = () => {
    console.log("Handle invite alert clicked");

    setInviteAlert(false);
  };

  if (isLoading) {
    return <TripDetailsSkeleton />;
  }

  const trip = tripDetails as TTrip;
  const { userId, destination } = trip;
  const isTripCreator = userInfo?.id === userId;

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#c4e7e3",
          borderBottom: "1px solid #c4e7e3",
        }}
      >
        <Container>
          <Stack py={{ xs: 3, md: 5 }} gap={2}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "flex-end" }}
              gap={2}
            >
              <Box sx={{ width: "100%" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                  sx={{ width: "100%" }}
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
                  {userInfo?.id === userId ? (
                    <Box>
                      <Button onClick={() => setInviteToJoin(true)}>
                        invite to join
                      </Button>
                    </Box>
                  ) : (
                    <>
                      {requestEligibility?.id ? (
                        <>
                          <Chip
                            label={`RQUEST ${requestEligibility?.status}`}
                            color="primary"
                            variant="outlined"
                          />
                        </>
                      ) : (
                        <>
                          <Box>
                            <Button
                              onClick={() => {
                                if (!isLoading && !userInfo?.id) {
                                  redirectToLogin(
                                    router,
                                    pathname,
                                    searchParams,
                                  );
                                }
                                setRequestToJoinModal(true);
                              }}
                            >
                              request to join
                            </Button>
                          </Box>
                        </>
                      )}
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container>
        {isTripCreator ? (
          <TripDetailsCreatorTabs tripId={tripId} trip={trip} />
        ) : (
          <TripDetailsOverviewTab trip={trip} />
        )}
      </Container>

      <TTAlert
        message={`Are you sure you want to join this trip?`}
        open={requestToJoinModal}
        setOpen={setRequestToJoinModal}
        onYesClick={() => handleRequestToJoin(tripId, userInfo?.id)}
      />

      <TTAlert
        message={`Are you sure you want to invite the user to join this trip?`}
        open={inviteAlert}
        setOpen={setInviteAlert}
        onYesClick={handleInviteAlert}
      />

      <TTModal
        open={inviteToJoin}
        setOpen={setInviteToJoin}
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
            value={activeInviteTab}
            onChange={(v) => setActiveInviteTab(v as number)}
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

          {activeInviteTab === 0 && (
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
                <Stack direction="row" gap={2} alignItems="flex-start">
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontWeight={900} sx={{ lineHeight: 1.15 }}>
                      AI picks for this trip
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(0,0,0,0.65)", fontSize: 13, mt: 0.5 }}
                    >
                      Based on destination, dates, and travel style.
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={{
                  maxHeight: { xs: 340, md: 420 },
                  overflow: "auto",
                  pr: 0.5,
                }}
              >
                <Stack gap={1.25}>
                  {isLoadingTravellers
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <Paper
                          key={`ai-skeleton-${i}`}
                          variant="outlined"
                          sx={{ p: 1.5, borderRadius: 2 }}
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
                            >
                              <Skeleton
                                variant="circular"
                                width={36}
                                height={36}
                              />
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
                      ))
                    : travellerList?.slice(0, 6).map((traveller: IUserData) => (
                        <Link
                          key={traveller.id}
                          href={`/travelers/${traveller?.id}`}
                        >
                          <Paper
                            variant="outlined"
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              borderColor: "rgba(58,176,162,0.22)",
                              backgroundColor: "rgba(255,255,255,0.9)",
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
                                  {getInitials(traveller?.name || "Traveller")}
                                </Avatar>
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography fontWeight={900} noWrap>
                                    {traveller?.name || "Unnamed traveller"}
                                  </Typography>
                                  <Typography
                                    noWrap
                                    sx={{
                                      color: "rgba(0,0,0,0.6)",
                                      fontSize: 13,
                                    }}
                                  >
                                    {traveller?.email || " "}
                                  </Typography>
                                </Box>
                              </Stack>
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  color={getStatusChipColor(traveller?.status)}
                                  label={traveller?.status || "UNKNOWN"}
                                  sx={{ fontWeight: 900 }}
                                />
                                <Button
                                  size="small"
                                  // disabled
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setInviteAlert(true);
                                  }}
                                  sx={{
                                    borderRadius: 999,
                                    px: 1.5,
                                    py: 0.75,
                                    fontWeight: 700,
                                  }}
                                >
                                  Invite
                                </Button>
                              </Stack>
                            </Stack>
                          </Paper>
                        </Link>
                      ))}
                </Stack>
              </Box>
            </Stack>
          )}

          {activeInviteTab === 1 && (
            <Stack gap={1.5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon sx={{ color: "rgba(0,0,0,0.55)" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                sx={{
                  maxHeight: { xs: 340, md: 420 },
                  overflow: "auto",
                  pr: 0.5,
                }}
              >
                <Stack gap={1.25}>
                  {isLoadingTravellers
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <Paper
                          key={`manual-skeleton-${i}`}
                          variant="outlined"
                          sx={{ p: 1.5, borderRadius: 2 }}
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
                            >
                              <Skeleton
                                variant="circular"
                                width={36}
                                height={36}
                              />
                              <Box>
                                <Skeleton width={180} height={20} />
                                <Skeleton width={130} height={16} />
                              </Box>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                              <Skeleton width={78} height={28} />
                              <Skeleton width={80} height={32} />
                            </Stack>
                          </Stack>
                        </Paper>
                      ))
                    : travellerList.map((traveller: IUserData) => (
                        <Link
                          key={traveller.id}
                          href={`/travelers/${traveller?.id}`}
                        >
                          <Paper
                            variant="outlined"
                            sx={{ p: 1.5, borderRadius: 2 }}
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
                                  {getInitials(traveller?.name || "Traveller")}
                                </Avatar>
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography fontWeight={900} noWrap>
                                    {traveller?.name || "Unnamed traveller"}
                                  </Typography>
                                  <Typography
                                    noWrap
                                    sx={{
                                      color: "rgba(0,0,0,0.6)",
                                      fontSize: 13,
                                    }}
                                  >
                                    {traveller?.email || " "}
                                  </Typography>
                                </Box>
                              </Stack>
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  color={getStatusChipColor(traveller?.status)}
                                  label={traveller?.status || "UNKNOWN"}
                                  sx={{ fontWeight: 900 }}
                                />
                                <Button
                                  size="small"
                                  // disabled
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setInviteAlert(true);
                                  }}
                                  sx={{
                                    borderRadius: 999,
                                    px: 1.5,
                                    py: 0.75,
                                    fontWeight: 900,
                                  }}
                                >
                                  Invite
                                </Button>
                              </Stack>
                            </Stack>
                          </Paper>
                        </Link>
                      ))}

                  {!isLoadingTravellers && travellerList.length === 0 && (
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        border: "1px dashed rgba(0,0,0,0.2)",
                        textAlign: "center",
                      }}
                    >
                      <Typography fontWeight={900}>
                        No travellers found
                      </Typography>
                      <Typography
                        sx={{ color: "rgba(0,0,0,0.65)", fontSize: 13 }}
                      >
                        When user data is available, results will appear here.
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Stack>
          )}
        </Stack>
      </TTModal>
    </Box>
  );
};

export default TripDetailsPage;
