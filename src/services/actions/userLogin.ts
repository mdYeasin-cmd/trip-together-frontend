"use server";
import { BACKEND_API_URL } from "@/constants";
import { IUserCredentials } from "@/types";

export const userLogin = async (data: IUserCredentials) => {
  const res = await fetch(`${BACKEND_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const userInfo = await res.json();
  return userInfo;
};
