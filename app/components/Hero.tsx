import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanityClient";
import { PortableText } from "@portabletext/react";

async function getData() {
  const query = `*[_type == "home"] [0] {
    "image": image.asset._ref,
  content,
  buttonText,
  buttonLink
}

`;
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
}

const Hero = async () => {
  const data = await getData();
  return (
    <div className="flex justify-center items-center">
      <div className="container">
        <div className="mt-6">
          <div className="text-center">
            <PortableText
              value={data.content}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-6">{children}</p>,
                },
              }}
            />
            <div className="flex justify-center">
              <Image
                src={urlFor(data.image).url()}
                width={600}
                height={600}
                alt=""
                className="rounded-2xl"
              />
            </div>
            <div className="mt-4 text-center">
              <Link
                style={{ color: "#0000EE", textDecoration: "underline" }}
                href={data.buttonLink}
              >
                <button className="text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer">
                  {data.buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
