import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { colors } from "@/constants";
import ChooseUsReason from "../ChooseUsReason/ChooseUsReason";

const WhyChooseUs = () => {
  const reasons = [
    "We connect you with travel companions who share your interests, travel style, and budget.",
    "Get to know potential buddies beforehand through in-depth profiles and trip details.",
    "Our verification process ensures a safe and trustworthy environment.",
    "Engage with a community of passionate travelers, share experiences, and get travel advice.",
    "Share photos, stories, and tips with your travel buddy and the wider community.",
  ];

  return (
    <Box
      sx={{
        mt: { xs: 6, md: 10 },
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(180deg,
            rgba(58, 176, 162, 0.06) 0%,
            rgba(53, 162, 159, 0.10) 100%
          ),
          radial-gradient(900px circle at 8% 18%,
            rgba(58, 176, 162, 0.18) 0%,
            rgba(58, 176, 162, 0) 62%
          ),
          radial-gradient(720px circle at 92% 78%,
            rgba(53, 162, 159, 0.16) 0%,
            rgba(53, 162, 159, 0) 58%
          )
        `,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(2px 2px at 20px 20px, rgba(0,0,0,0.06) 0, rgba(0,0,0,0) 60%)",
          backgroundSize: "44px 44px",
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <Stack
              spacing={3}
              sx={{
                maxWidth: 620,
                mx: { xs: "auto", md: 0 },
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography
                  component="p"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: colors.SECONDARY,
                    backgroundColor: "rgba(53, 162, 159, 0.12)",
                    border: "1px solid rgba(53, 162, 159, 0.22)",
                  }}
                >
                  Why Choose Us
                </Typography>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    mt: 1.25,
                    fontWeight: 800,
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Make every trip safer, smarter, and more social.
                </Typography>
                <Typography
                  component="p"
                  sx={{ mt: 1.25, color: "rgba(0, 0, 0, 0.72)" }}
                >
                  Trip Together helps you meet the right travel buddy and plan
                  with confidence, backed by profiles, details, and a supportive
                  community.
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              spacing={2}
              sx={{ maxWidth: 620, mx: { xs: "auto", md: 0 } }}
            >
              {reasons.map((reason) => (
                <ChooseUsReason key={reason} reason={reason} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
