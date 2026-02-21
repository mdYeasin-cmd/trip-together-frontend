import { Box, Paper, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { colors } from "@/constants";

const ChooseUsReason = ({ reason }: { reason: string }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 2.25 },
        borderRadius: 3,
        borderColor: "rgba(58, 176, 162, 0.22)",
        backgroundColor: "rgba(255,255,255,0.85)",
        boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
        transition:
          "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.10)",
          borderColor: "rgba(58, 176, 162, 0.36)",
          backgroundColor: "rgba(255,255,255,0.92)",
        },
      }}
    >
      <Stack direction="row" spacing={1.75} alignItems="flex-start">
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            backgroundColor: "rgba(53, 162, 159, 0.12)",
            border: "1px solid rgba(53, 162, 159, 0.22)",
          }}
        >
          <CheckCircleRoundedIcon
            sx={{ fontSize: 22, color: colors.SECONDARY }}
          />
        </Box>
        <Typography
          component="p"
          sx={{ pt: 0.25, color: "rgba(0, 0, 0, 0.78)" }}
        >
          {reason}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ChooseUsReason;
