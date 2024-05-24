import {
  Button,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

const SearchSection = () => {
  return (
    <Container>
      <Stack sx={{ py: 5 }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              placeholder="Search you desire travell buddy"
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item md={4}>
            <TextField select sx={{ width: "100%" }}>
              <MenuItem value={"Destination"}>Destination</MenuItem>
              <MenuItem value={"Travel dates"}>Travel dates</MenuItem>
              <MenuItem value={"Travel type"}>Travel type</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={2}>
            <Button sx={{ width: "100%", height: "100%" }}>Search</Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default SearchSection;
