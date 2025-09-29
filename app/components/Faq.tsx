"use client";
import { useState } from "react";
import FaqItem from "./FaqItem";

const Faq = ({ data }: any) => {
  const [showFaq, setShowFaq] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setShowFaq((prevId) => (prevId === id ? null : id));
  };
  return (
    <div>
      {data.map((item: any) => {
        return (
          <FaqItem
            key={item.id}
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
