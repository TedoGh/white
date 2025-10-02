import { Metadata } from "next";
import MinisterialCandidate from "../components/MinisterialCandidate";

export const metadata: Metadata = {
  title: "მინისტრობის კანდიდატი",
};

const page = () => {
  return (
    <div className="mt-10">
      <div className="container">
        <MinisterialCandidate />
      </div>
    </div>
  );
};

export default page;
