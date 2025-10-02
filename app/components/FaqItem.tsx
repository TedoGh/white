import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { FaqData } from "../types/FaqData";

interface Props {
  data: FaqData;
  showFaq: string | null;
  onClick: (id: string) => void;
}

const FaqItem = ({ data, showFaq, onClick }: Props) => {
  return (
    <div>
      <div className="py-3">
        <div className="flex justify-between items-center">
          <h1
            onClick={() => onClick(data._id)}
            className="text-base lg:text-lg cursor-pointer"
          >
            {data.title}
          </h1>
          <div
            className="w-10 h-10 rounded-full flex justify-center items-center border-2 border-[#000] cursor-pointer"
            onClick={() => onClick(data._id)}
          >
            {showFaq === data._id ? (
              <RiArrowUpSLine size={24} />
            ) : (
              <RiArrowDownSLine size={24} />
            )}
          </div>
        </div>
        {showFaq === data._id && <p className="mt-4">{data.description}</p>}
      </div>
    </div>
  );
};

export default FaqItem;
