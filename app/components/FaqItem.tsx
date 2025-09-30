import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { FaqData } from "../types/FaqData";

interface Props {
  data: FaqData;
  showFaq: string | null;
  onClick: (id: string) => void;
}

const FaqItem = ({ data, showFaq, onClick }: Props) => {
  return (
    <div className="border-t-2 border-b-2 border-[#FFFFFF0F]">
      <div className="py-6 px-5">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">{data.title}</h1>
          <div
            className="w-10 h-10 rounded-full flex justify-center items-center border-2 border-[#FFFFFF0F] cursor-pointer"
            onClick={() => onClick(data.id)}
          >
            {showFaq === data.id ? (
              <RiArrowUpSLine size={24} />
            ) : (
              <RiArrowDownSLine size={24} />
            )}
          </div>
        </div>
        {showFaq === data.id && (
          <p className="mt-4 max-w-[600px]">{data.description}</p>
        )}
      </div>
    </div>
  );
};

export default FaqItem;
