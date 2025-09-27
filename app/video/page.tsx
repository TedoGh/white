import CardItem from "../components/CardItem";

interface DataItem {
  id: number;
  title: string;
  profesia: string;
  video: string;
}
const data: DataItem[] = [
  {
    id: 1,
    title: "გიორგი გიორგაძე",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "გიორგი გიორგაძე 2",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
  {
    id: 3,
    title: "გიორგი გიორგაძე 3",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    id: 4,
    title: "გიორგი გიორგაძე 4",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    id: 5,
    title: "გიორგი გიორგაძე 5",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    id: 6,
    title: "გიორგი გიორგაძე 6",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    id: 7,
    title: "გიორგი გიორგაძე 7",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    id: 8,
    title: "გიორგი გიორგაძე 8",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
  {
    id: 9,
    title: "გიორგი გიორგაძე 9",
    profesia: "რეჟისორი",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
  },
];

const Page = () => {
  return (
    <div>
      <div className="container">
        <div>
          <h1>ძებნა</h1>
        </div>
        <div className="flex gap-8 mt-5 flex-wrap">
          {data.map((item: DataItem) => (
            <CardItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
