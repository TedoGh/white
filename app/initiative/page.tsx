import { FaqData } from "../types/FaqData";
import Faq from "../components/Faq";
import { client } from "@/lib/sanityClient";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { Metadata } from "next";

async function getData() {
  const query = `*[_type == "initiative"] [0] {
  content
}

`;
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
}

export async function getFaqData() {
  const query = `*[_type == "faq"] | order(_updatedAt asc) {
    _id,
    title,
    description
  }`;
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
}

export const metadata: Metadata = {
  title: "ინიციატივა",
};
const page = async () => {
  const data: any = await getData();
  const faqData: FaqData[] = await getFaqData();
  return (
    <div>
      <div className="container">
        <div>
          <PortableText
            value={data.content}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-6">{children}</p>,
              },
            }}
          />
        </div>
        <div className="mt-10">
          <Faq data={faqData} />
        </div>
      </div>
    </div>
  );
};

export default page;
