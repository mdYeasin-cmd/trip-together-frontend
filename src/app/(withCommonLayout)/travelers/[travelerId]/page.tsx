"use client";

import { useGetATravelerQuery } from "@/redux/api/usersApi";
import { colors } from "@/constants";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { getInitials } from "@/utils/avatar";
import { getStatusChipColor } from "@/utils/chip-color";
import ProfileSkeleton from "@/components/Skeleton/ProfileSkeleton";

const TravelerPage = ({ params }: { params: { travelerId: string } }) => {
  const { travelerId } = params;

  const { data: traveler, isLoading } = useGetATravelerQuery(travelerId);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  const { name, email, status } = traveler;

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
              alignItems={{ xs: "flex-start", md: "center" }}
              gap={2}
            >
              <Stack direction="row" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    fontWeight: 800,
                    bgcolor: colors.SECONDARY,
                    color: colors.WHITE,
                    boxShadow: 1,
                  }}
                >
                  {getInitials(name)}
                </Avatar>

                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    fontWeight={800}
                    sx={{ lineHeight: 1.1 }}
                  >
                    {name || "Traveler Profile"}
                  </Typography>
                  <Typography sx={{ color: "rgba(0,0,0,0.72)", mt: 0.75 }}>
                    Public profile details
                  </Typography>
                </Box>
              </Stack>

              <Chip
                label={status || "UNKNOWN"}
                color={getStatusChipColor(status)}
                variant={status ? "filled" : "outlined"}
                sx={{ fontWeight: 700 }}
              />
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
                p: 3,
                backgroundColor: colors.WHITE,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" component="h2" fontWeight={800}>
                Account
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Stack gap={1.5}>
                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <PersonRoundedIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Name</Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.75)" }}>
                      {name || "-"}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <EmailRoundedIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Email</Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.75)" }}>
                      {email || "-"}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <BadgeRoundedIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Status</Typography>
                    <Typography sx={{ color: "rgba(0,0,0,0.75)" }}>
                      {status || "-"}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
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
                Details
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Stack gap={1.5}>
                <Stack direction="row" gap={1.5} alignItems="flex-start">
                  <BadgeRoundedIcon sx={{ color: colors.SECONDARY }} />
                  <Box>
                    <Typography fontWeight={700}>Traveler ID</Typography>
                    <Typography
                      sx={{
                        color: "rgba(0,0,0,0.75)",
                        wordBreak: "break-all",
                      }}
                    >
                      {travelerId}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TravelerPage;
