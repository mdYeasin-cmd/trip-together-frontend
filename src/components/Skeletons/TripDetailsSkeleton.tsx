import { colors } from "@/constants";
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";

const TripDetailsSkeleton = () => {
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
                    <Skeleton variant="circular" width={34} height={34} />
                    <Skeleton variant="text" width={260} height={48} />
                  </Box>
                  <Skeleton variant="rounded" width={140} height={36} />
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
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: { xs: 280, md: 420 } }}
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
              <Skeleton variant="text" width={170} height={28} />
              <Divider sx={{ my: 2 }} />
              <Stack gap={1.5}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Stack
                    key={`overview-skeleton-${i}`}
                    direction="row"
                    gap={1.5}
                    alignItems="flex-start"
                  >
                    <Skeleton variant="circular" width={24} height={24} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width={120} height={20} />
                      <Skeleton variant="text" width="80%" height={18} />
                    </Box>
                  </Stack>
                ))}
              </Stack>
              <Divider sx={{ my: 2.5, mt: "auto" }} />
              <Skeleton variant="text" width={220} height={20} />
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
          <Skeleton variant="text" width={180} height={28} />
          <Divider sx={{ my: 2 }} />
          <Stack gap={1}>
            <Skeleton variant="text" width="95%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="92%" height={20} />
            <Skeleton variant="text" width="75%" height={20} />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default TripDetailsSkeleton;
