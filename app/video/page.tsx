import { client } from "@/lib/sanityClient";
import CardItem from "../components/CardItem";
import { Metadata } from "next";

export async function getVideoData() {
  const query = `*[_type == "video"] {
  _id,
  title,
  "photo": photo.asset._ref,
  profession,
 "videoUrl": videoFile.asset->url   
}`;
  const data = await client.fetch(query, {}, { cache: "no-store" });
  return data;
}

export const metadata: Metadata = {
  title: "გაგციცანი",
};
const Page = async () => {
  const videoData = await getVideoData();
  return (
    <div>
      <div className="container">
        <div className="flex gap-8 mt-5 flex-wrap">
          {videoData.map((item: any) => (
            <CardItem key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
