import { assets } from "@/assets";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

export const Logo = ({ width = 200 }: { width?: number }) => {
  return (
    <Box>
      <Image src={assets.logo} width={width} alt={"logo"} />
    </Box>
  );
};

export const WhiteLogo = ({ width = 200 }: { width?: number }) => {
  return (
    <Box>
      <Image src={assets.whiteLogo} width={width} alt={"logo"} />
    </Box>
  );
};
