import { Metadata } from "next";
import VolunteerForm from "../components/VolunteerForm";

export const metadata: Metadata = {
  title: "შემოგვიერთდი",
};

const page = () => {
  return (
    <div className="mt-10">
      <div className="container">
        <VolunteerForm />
      </div>
    </div>
  );
};

export default page;
