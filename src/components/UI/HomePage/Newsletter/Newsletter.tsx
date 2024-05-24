import { colors } from "@/constants";
import {
  Box,
  Button,
  Container,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "sonner";
import NewsletterSubmitBtn from "../NewsletterSubmitBtn/NewsletterSubmitBtn";

const Newsletter = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors.PRIMARY,
        py: 10,
      }}
    >
      <Container>
        <Typography
          variant="h3"
          component={"h3"}
          sx={{ textAlign: "center", color: "#FFF", fontWeight: 700 }}
        >
          Newsletter
        </Typography>

        <Typography
          component={"p"}
          sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.8)" }}
        >
          For get useful travel tips, guides, and advice by every week, you can
          subscrible our newsletter.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <InputBase
            placeholder="Enter you email"
            sx={{
              width: "80%",
              backgroundColor: "#FFF",
              borderRadius: "5px",
              padding: "10px 25px",
            }}
            endAdornment={<NewsletterSubmitBtn />}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
