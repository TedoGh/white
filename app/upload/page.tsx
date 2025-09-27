"use client";

import React from "react";
import VolunteerForm from "../components/VolunteerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import MinisterialCandidate from "../components/MinisterialCandidate";

const Page = () => {
  return (
    <div className="container mt-5">
      <Tabs defaultValue="volunteer" className="w-full">
        <TabsList className="flex gap-4 justify-center mb-6">
          {/* Volunteer Tab */}
          <TabsTrigger
            value="volunteer"
            className="flex items-center gap-2 px-4 py-2 font-bold cursor-pointer border rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            {/* Checkbox indicator */}
            <span
              className="w-4 h-4 border rounded-sm flex items-center justify-center
                         data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              ✓
            </span>
            მოხალისე
          </TabsTrigger>

          {/* Ministerial Candidate Tab */}
          <TabsTrigger
            value="ministerialCandidate"
            className="flex items-center gap-2 px-4 py-2 font-bold cursor-pointer border rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            {/* Checkbox indicator */}
            <span
              className="w-4 h-4 border rounded-sm flex items-center justify-center
                         data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              ✓
            </span>
            მინისტრობის კანდიდატი
          </TabsTrigger>
        </TabsList>

        <TabsContent value="volunteer">
          <VolunteerForm />
        </TabsContent>
        <TabsContent value="ministerialCandidate">
          <MinisterialCandidate />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
