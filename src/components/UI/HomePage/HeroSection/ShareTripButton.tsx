"use client";

import { getUserInfo } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const ShareTripButton = () => {
  const userInfo = getUserInfo();

  console.log(userInfo, "user info");

  let redirectLink: string;

  if (userInfo?.id && userInfo?.role === "traveler") {
    redirectLink = "/dashboard/traveler/travel-posts";
  } else {
    redirectLink = "/login";
  }

  return (
    <Button component={Link} href={redirectLink}>
      Share Your Trip
    </Button>
  );
};

export default ShareTripButton;
