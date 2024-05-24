import TravelCard from "@/components/Shared/TravelCard/TravelCard";
import { Container, Grid, Stack } from "@mui/material";
import React from "react";

const TravelPostSection = () => {
  const travelPosts = [1, 2, 3]; // 4, 5, 6, 7, 8, 9
  return (
    <Container>
      <Grid container spacing={2} my={4}>
        {travelPosts.map((travelPost, index) => (
          <Grid key={index} item md={4}>
            <TravelCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TravelPostSection;
