import React from "react";
import Faq from "../components/Faq";

interface FaqData {
  id: string;
  title: string;
  description: string;
}

const data: FaqData[] = [
  {
    id: "1",
    title: "სათაური 1",
    description: "აღწერა 1",
  },
  {
    id: "2",
    title: "სათაური 2",
    description: "აღწერა 2",
  },
  {
    id: "3",
    title: "სათაური 3",
    description: "აღწერა 3",
  },
  {
    id: "4",
    title: "სათაური 4",
    description: "აღწერა 4",
  },
];

const page = () => {
  return (
    <div>
      <div className="container">
        <div>
          <h1 className="font-bold">ხშირად დასმული კითხვები</h1>
          <Faq data={data} />
        </div>
      </div>
    </div>
  );
};

export default page;
