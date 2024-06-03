import { assets } from "@/assets";
import { colors } from "@/constants";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

const HeroSection = () => {
  const ShareTripButton = dynamic(
    () => import("@/components/UI/HomePage/HeroSection/ShareTripButton"),
    { ssr: false }
  );

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#c4e7e3",
        height: "92vh",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "200px",
          }}
        >
          <Box>
            <Typography variant="h2" component="h1" fontWeight={600}>
              Beyond Guidebooks,
            </Typography>

            <Typography
              variant="h2"
              color={colors.SECONDARY}
              component="h1"
              fontWeight={600}
            >
              Go With a Travel Buddy!
            </Typography>

            <Typography
              component={"p"}
              sx={{ my: 2, color: "rgba(0, 0, 0, 0.8)" }}
            >
              Sure, ditch the guidebook and swap it for a travel buddy! While
              guidebooks offer valuable information, a travel companion brings a
              whole new dimension to your adventure. pen_spark
            </Typography>

            <ShareTripButton />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: "50px",
          textAlign: "center",
        }}
      >
        <Image
          src={assets.bannerImage}
          alt={"Banner"}
          height={700}
          width={700}
        />
      </Box>
    </Stack>
  );
};

export default HeroSection;
