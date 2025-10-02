import { Metadata } from "next";
import Hero from "./components/Hero";

export const metadata: Metadata = {
  title: "მთავარი",
};

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
