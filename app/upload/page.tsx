import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ატვირთე",
};

const Page = () => {
  return (
    <div className="container mt-5">
      <div className="flex justify-center flex-col">
        <div className="flex gap-4 flex-col justify-center text-center h-[50vh]">
          <Link href={"/volunteer"}>
            <button className="text-white bg-black  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer w-1/2">
              შემოგვიერთდი
            </button>
          </Link>
          <Link href={"/ministerial"}>
            <button className="text-white bg-black  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer w-1/2">
              მინისტრობის კანდიდატი
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
