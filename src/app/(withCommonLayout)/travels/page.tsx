import TravelCard from "@/components/Shared/TravelCard/TravelCard";
import SearchSection from "@/components/UI/HomePage/SearchSection/SearchSection";
import { BACKEND_API_URL } from "@/constants";
import { TTrip } from "@/types";
import { Container, Grid } from "@mui/material";

const TravelsPage = async () => {
  const res = await fetch(`${BACKEND_API_URL}/trips`);
  const data = await res.json();

  const travelPosts = data?.data?.data;

  // console.log(data?.data?.data, "data");

  return (
    <Container>
      <SearchSection />
      <Grid container spacing={2} my={4}>
        {travelPosts.map((travelPost: TTrip, index: number) => (
          <Grid key={index} item md={4}>
            <TravelCard post={travelPost} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TravelsPage;
