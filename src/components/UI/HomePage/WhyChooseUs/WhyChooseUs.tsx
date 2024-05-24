import { assets } from "@/assets";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { colors } from "@/constants";

const WhyChooseUs = () => {
  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(146, 141, 141, 0.1)",
        clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
      }}
    >
      <Container
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Box
          sx={{
            flex: 1,
            paddingY: 5,
            paddingLeft: 8,
          }}
        >
          <Image
            src={assets.whyChooseUs}
            alt="Why Choose Us"
            width={400}
            height={400}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <ChooseUsReason
            reason={
              "We connect you with travel companions who share your interests, travel style, and budget."
            }
          />
          <ChooseUsReason
            reason={
              "Get to know potential buddies beforehand through in-depth profiles and trip details."
            }
          />
          <ChooseUsReason
            reason={
              "Our verification process ensures a safe and trustworthy environment."
            }
          />
          <ChooseUsReason
            reason={
              "Engage with a community of passionate travelers, share experiences, and get travel advice."
            }
          />
          <ChooseUsReason
            reason={
              "Share photos, stories, and tips with your travel buddy and the wider community."
            }
          />
        </Box>
      </Container>
    </Box>
  );
};

const ChooseUsReason = ({ reason }: { reason: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        background: "#FFF",
        padding: "24px 16px",
        borderRadius: "12px",
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircleRoundedIcon
          sx={{ fontSize: "35px", color: colors.SECONDARY }}
        />
      </Box>
      <Box sx={{ width: "90%", pl: 1 }}>{reason}</Box>
    </Box>
  );
};

export default WhyChooseUs;
