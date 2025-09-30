import Image from "next/image";
import React from "react";
import test from "../components/test.jpg";
import Button from "./Button";
const Hero = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ padding: "0px 0" }}
    >
      <div className="container">
        <div className="mt-6">
          <div className="text-center">
            <p className="mb-6">
              ეს ქვეყანა ჩვენია - ერთად გამოვიყვანოთ კრიზისიდან.
            </p>
            <p className="mb-6">
              „ანტიკრიზისული პლატფორმა“ აერთიანებს ყველას, ვისაც სჯერა, რომ
              კრიზისის დაძლევა საქართველოში შესაძლებელია მხოლოდ მოქალაქეთა
              ჩართულობით, პროფესიონალიზმითა და სისტემური ანტიკრიზისული ხედვით.
            </p>
            <p className="mb-6">
              გაიგე მეტი ჩვენი ინიციატივის შესახებ, გაეცანი და
              შეუერთდი მანიფესტს.
            </p>
            <div className="flex justify-center">
              <Image
                src={test}
                width={600}
                height={600}
                alt=""
                className="rounded-2xl"
              />
            </div>
            <div className="mt-4 text-center">
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
