"use client";

import React from "react";
import VolunteerForm from "../components/VolunteerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import MinisterialCandidate from "../components/MinisterialCandidate";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mt-5">
      <div className="flex justify-center flex-col">
        <h1 className="font-bold">აქ უნდა იყოს ტექსტი არჩევაზე</h1>
        <div className="flex gap-4">
          <Link href={"/volunteer"}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              მოხალისე
            </button>
          </Link>
          <Link href={"/ministerial"}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
              მინისტრობის კანდიდატი
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
