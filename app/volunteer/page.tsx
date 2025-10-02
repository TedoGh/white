import { Metadata } from "next";
import VolunteerForm from "../components/VolunteerForm";

export const metadata: Metadata = {
  title: "მოხალისე",
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
