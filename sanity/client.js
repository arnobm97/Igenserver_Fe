import { createClient } from "next-sanity";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});