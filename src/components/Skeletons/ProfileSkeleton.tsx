import { colors } from "@/constants";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

const ProfileSkeleton = () => {
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
                <Skeleton variant="circular" width={72} height={72} />
                <Box>
                  <Skeleton variant="text" width={240} height={44} />
                  <Skeleton variant="text" width={160} height={24} />
                </Box>
              </Stack>

              <Skeleton variant="rounded" width={120} height={34} />
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
              }}
            >
              <Skeleton variant="text" width={180} height={28} />
              <Divider sx={{ my: 2 }} />
              <Stack gap={1.25}>
                <Skeleton variant="text" width="85%" height={24} />
                <Skeleton variant="text" width="70%" height={24} />
                <Skeleton variant="text" width="60%" height={24} />
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
              }}
            >
              <Skeleton variant="text" width={160} height={28} />
              <Divider sx={{ my: 2 }} />
              <Stack gap={1.25}>
                <Skeleton variant="text" width="90%" height={24} />
                <Skeleton variant="text" width="65%" height={24} />
                <Skeleton variant="text" width="75%" height={24} />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfileSkeleton;
