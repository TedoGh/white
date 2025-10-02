import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "31kdvpu2", // შენი Sanity პროექტის ID
  dataset: "production", // dataset
  useCdn: false, // თუ არ გჭირდება ახლახან განახლებული მონაცემები
  apiVersion: "2025-10-01", // ან დღეს მიმდინარე თარიღი
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
