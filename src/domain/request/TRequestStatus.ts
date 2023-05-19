import { z } from "zod";
import { InvalidStatus } from "./InvalidStatus";

export type TRequestStatus = "pending" | "in progress" | "sent"

export const requestStatusValidator = z.custom<TRequestStatus>((value) => {
  if (value === "pending" || value === "in progress" || value === "sent") {
    return value;
  }

  throw new InvalidStatus();
});