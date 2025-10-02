"use client";
import { useState } from "react";
import FaqItem from "./FaqItem";

interface FaqData {
  _id: string;
  title: string;
  description: string;
}

interface Props {
  data: FaqData[];
}

const Faq = ({ data }: Props) => {
  const [showFaq, setShowFaq] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setShowFaq((prevId) => (prevId === id ? null : id));
  };
  return (
    <div>
      {data.map((item) => {
        return (
          <FaqItem
            key={item._id}
            data={item}
            showFaq={showFaq}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default Faq;
