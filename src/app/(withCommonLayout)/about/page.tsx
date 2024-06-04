import { assets } from "@/assets";
import { Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <Stack
      sx={{ height: "calc(100vh - 81px)" }}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"row"}
    >
      <Image
        src={assets.comingSoon}
        alt="Coming Soon"
        width={600}
        height={600}
      />
    </Stack>
  );
};

export default AboutPage;
