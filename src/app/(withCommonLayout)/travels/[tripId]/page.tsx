"use client";

import TTAlert from "@/components/Shared/TTAlert/TTAlert";
import TTModal from "@/components/Shared/TTModal/TTModal";
import { UserStatus, colors } from "@/constants";
import { useGetATripQuery } from "@/redux/api/tripsApi";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { getUserInfo } from "@/services/auth.service";
import { IUserData } from "@/types";
import { getInitials } from "@/utils/avatar";
import { getStatusChipColor } from "@/utils/chip-color";
import { dateFormatter } from "@/utils/dateFormater";
import { redirectToLogin } from "@/utils/redirect";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EventIcon from "@mui/icons-material/Event";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type TTraveller = {
  id: string;
  name?: string;
  status?: string;
  email?: string;
};

const TripDetailsPage = ({ params }: { params: { tripId: string } }) => {
  const { tripId } = params;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [requestToJoin, setRequestToJoin] = useState<boolean>(false);
  const [inviteToJoin, setInviteToJoin] = useState<boolean>(false);
  const [activeInviteTab, setActiveInviteTab] = useState<number>(0);
  const [inviteAlert, setInviteAlert] = useState<boolean>(false);

  const userInfo = getUserInfo();

  const { data: tripDetails, isLoading } = useGetATripQuery(tripId);
  const { data: travellerList, isLoading: isLoadingTravellers } =
    useGetAllUsersQuery(undefined);

  const handleRequestToJoin = (): void => {
    console.log("Requst to join");

    setRequestToJoin(false);
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
    return <>Loading...</>;
  }

  const {
    userId,
    photos,
    destination,
    travelType,
    budget,
    startDate,
    endDate,
    description,
    createdAt,
    updatedAt,
  } = tripDetails;

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
                    <Box>
                      <Button
                        onClick={() => {
                          if (!isLoading && !userInfo?.id) {
                            redirectToLogin(router, pathname, searchParams);
                          }
                          setRequestToJoin(true);
                        }}
                      >
                        request to join
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container>
        <Grid container spacing={3} my={{ xs: 3, md: 5 }}>
          <Grid item xs={12} md={7} sx={{ display: "flex" }}>
            <Paper
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                overflow: "hidden",
                backgroundColor: colors.WHITE,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                component="img"
                src={`${photos[0]}`}
                alt={destination || "Trip photo"}
                sx={{
                  display: "block",
                  width: "100%",
                  height: { xs: 280, md: 420 },
                  objectFit: "cover",
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            <Paper
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                p: 3,
                backgroundColor: colors.WHITE,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" component="h2" fontWeight={800}>
                Trip Overview
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Stack gap={1.5}>
                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <LocationOnRoundedIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Destination</Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.75)" }}>
                      {destination || "-"}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <EventIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Dates</Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.75)" }}>
                      {startDate && endDate
                        ? `${dateFormatter(startDate)} - ${dateFormatter(
                            endDate,
                          )}`
                        : "-"}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <StyleRoundedIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Travel Type</Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.75)" }}>
                      {travelType || "-"}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <PaidRoundedIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Budget</Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.75)" }}>
                      {budget !== null ? budget : "-"}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Divider sx={{ my: 2.5, mt: "auto" }} />
              <Typography
                component="p"
                sx={{ color: "rgba(0,0,0,0.65)", fontSize: 14 }}
              >
                Posted {createdAt ? dateFormatter(createdAt) : "-"}
                {updatedAt ? ` • Updated ${dateFormatter(updatedAt)}` : ""}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper
          sx={{
            borderRadius: 2,
            boxShadow: 1,
            p: { xs: 2.5, md: 3 },
            mb: { xs: 4, md: 6 },
            backgroundColor: colors.WHITE,
          }}
        >
          <Typography variant="h6" component="h2" fontWeight={800}>
            About This Trip
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography
            component="p"
            sx={{ color: "rgba(0,0,0,0.75)", whiteSpace: "pre-line" }}
          >
            {description || "No description provided."}
          </Typography>
        </Paper>
      </Container>

      <TTAlert
        message={`Are you sure you want to join this trip?`}
        open={requestToJoin}
        setOpen={setRequestToJoin}
        onYesClick={handleRequestToJoin}
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

          <Tabs
            value={activeInviteTab}
            onChange={(_, v) => setActiveInviteTab(v)}
            variant="fullWidth"
            sx={{
              p: 0.5,
              borderRadius: 999,
              backgroundColor: "rgba(58,176,162,0.12)",
              border: "1px solid rgba(58,176,162,0.18)",
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTab-root": {
                minHeight: 40,
                textTransform: "none",
                fontWeight: 800,
                color: "rgba(0,0,0,0.65)",
                borderRadius: 999,
              },
              "& .MuiTab-root.Mui-selected": {
                color: "rgba(0,0,0,0.9)",
                backgroundColor: colors.WHITE,
                boxShadow: 1,
              },
            }}
          >
            <Tab
              icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="AI suggested"
            />
            <Tab
              icon={<ManageSearchRoundedIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Manual search"
            />
          </Tabs>

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
                    : travellerList.slice(0, 6).map((traveller: IUserData) => (
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
