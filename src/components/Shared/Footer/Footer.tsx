import { assets } from "@/assets";
import { WhiteLogo } from "@/components/UI/Logo/Logo";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Box bgcolor={"rgb(17, 26, 34)"} py={5}>
      <Container>
        <Stack direction={"row"} gap={4} justifyContent={"center"} py={5}>
          <Typography color={"#fff"}>Home</Typography>
          <Typography color={"#fff"}>About</Typography>
          <Typography color={"#fff"}>Blog</Typography>
        </Stack>

        <Stack direction={"row"} gap={4} justifyContent={"center"} pt={5}>
          <Typography color={"#fff"}>
            support@triptogether.com &nbsp; | &nbsp; +8801813768522
          </Typography>
        </Stack>

        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Image
            src={assets.facebookIcon}
            width={30}
            height={30}
            alt="facebook"
          />
          <Image
            src={assets.instagramIcon}
            width={30}
            height={30}
            alt="instagram"
          />
          <Image
            src={assets.twitterIcon}
            width={30}
            height={30}
            alt="twitter"
          />
          <Image
            src={assets.linkedinIcon}
            width={30}
            height={30}
            alt="linkedin"
          />
        </Stack>

        {/* <div className="border-b-[1px] border-dashed"></div> */}
        <Box sx={{ border: "1px dashed lightgray" }}></Box>

        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <Typography component="p" color="white">
            &copy;2024 Trip Together. All Rights Reserved.
          </Typography>
          <WhiteLogo />
          <Typography component="p" color="white" sx={{ cursor: "pointer" }}>
            Privacy Policy | Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
