"use server";

import { BACKEND_API_URL } from "@/constants";
import { FieldValues } from "react-hook-form";

export const registerTraveler = async (data: FieldValues) => {
  const res = await fetch(`${BACKEND_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const travelerInfo = await res.json();
  return travelerInfo;
};