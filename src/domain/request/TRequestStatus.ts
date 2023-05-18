import { z } from "zod";

export type TRequestStatus = "pending" | "in progress" | "sent"

export const requestStatusValidator = z.custom<TRequestStatus>((value) => {
  if (value === "pending" || value === "in progress" || value === "sent") {
    return value;
  }

  throw new Error("Invalid request status");
});