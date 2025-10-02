import { FaqData } from "../types/FaqData";
import Faq from "../components/Faq";
import { client } from "@/lib/sanityClient";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { Metadata } from "next";
import Link from "next/link";

async function getData() {
  const query = `*[_type == "initiative"] [0] {
  content
}

`;
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
}

export async function getFaqData() {
  const query = `*[_type == "faq"] | order(_createdAt desc) {
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
  const data = await getData();
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
        <Link href={"/manifest"}>
          <button className="text-white bg-black  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer w-full">
            მანიფესტი
          </button>
        </Link>
        <div className="mt-10">
          <Faq data={faqData} />
        </div>
      </div>
    </div>
  );
};

export default page;
