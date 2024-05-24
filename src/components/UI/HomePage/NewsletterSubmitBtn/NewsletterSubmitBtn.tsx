"use client";

import { Button } from "@mui/material";
import { toast } from "sonner";

const NewsletterSubmitBtn = () => {
  return (
    <Button
      onClick={() => {
        toast.success("Please check you email for confirmation.");
      }}
    >
      Submit
    </Button>
  );
};

export default NewsletterSubmitBtn;
