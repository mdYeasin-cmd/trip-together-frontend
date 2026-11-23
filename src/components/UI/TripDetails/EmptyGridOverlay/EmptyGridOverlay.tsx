import { Stack, Typography } from "@mui/material";

type EmptyGridOverlayProps = {
  title: string;
  subtitle?: string;
};

const EmptyGridOverlay = ({ title, subtitle }: EmptyGridOverlayProps) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100%", p: 3, textAlign: "center" }}
    >
      <Typography fontWeight={800}>{title}</Typography>
      {subtitle && (
        <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 13 }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default EmptyGridOverlay;
