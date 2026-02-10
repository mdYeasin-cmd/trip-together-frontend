import TravelCard from "@/components/Shared/TravelCard/TravelCard";
import { BACKEND_API_URL } from "@/constants";
import { TTrip } from "@/types";
import { Container, Grid } from "@mui/material";
import React from "react";

const TravelPostSection = async () => {
  // const travelPosts = [1, 2, 3]; // 4, 5, 6, 7, 8, 9

  const res = await fetch(`${BACKEND_API_URL}/trips`);
  const data = await res.json();

  const travelPosts = data?.data?.data;

  console.log(travelPosts, "data");

  return (
    <Container>
      <Grid container spacing={2} my={4}>
        {travelPosts?.map((travelPost: TTrip, index: number) => (
          <Grid key={index} item md={4}>
            <TravelCard post={travelPost} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TravelPostSection;
