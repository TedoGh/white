import { client } from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Link from "next/link";

async function getData() {
  const query = `*[_type == "manifest"] [0] {
  content
}

`;
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
}

export const metadata: Metadata = {
  title: "მანიფესტი",
};
const page = async () => {
  const data = await getData();
  return (
    <div>
      <div className="container">
        <div>
          <PortableText
            value={data.content}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-6">{children}</p>,
                h4: ({ children }) => (
                  <h4 className="font-bold text-xl mb-5">{children}</h4>
                ),
              },
            }}
          />
          <Link href={"/volunteer"}>
            <button className="text-white bg-black  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer w-full">
              შემოგვიერთდი
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
