import postgres from "postgres";

export const client = postgres(
  "postgres://postgres:password@192.168.88.200:5432/business_db",
);
