import postgres from "postgres";

export const client = postgres(
  "postgres://postgres:password@localhost:5432/business_db",
);
