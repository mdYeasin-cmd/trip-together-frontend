import { colors } from "@/constants";
import type { TTrip } from "@/types";
import { dateFormatter } from "@/utils/dateFormater";
import EventIcon from "@mui/icons-material/Event";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";

type TripDetailsOverviewTabProps = {
  trip: TTrip;
};

const TripDetailsOverviewTab = ({ trip }: TripDetailsOverviewTabProps) => {
  const {
    photos,
    destination,
    travelType,
    budget,
    startDate,
    endDate,
    description,
    createdAt,
    updatedAt,
  } = trip;

  return (
    <>
      <Grid container spacing={3} mb={3}>
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
              src={`${photos?.[0] ?? ""}`}
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
                      ? `${dateFormatter(startDate)} - ${dateFormatter(endDate)}`
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
                    {budget !== null && budget !== undefined ? budget : "-"}
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
              {updatedAt ? ` - Updated ${dateFormatter(updatedAt)}` : ""}
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
    </>
  );
};

export default TripDetailsOverviewTab;
