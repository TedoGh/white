import Image from "next/image";
import React from "react";
import test from "../components/test.png";
import Button from "./Button";
const Hero = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "80vh" }}
    >
      <div className="container">
        <div className="mt-6">
          <div>
            <p className="mb-6">
              Lorem Ipsum საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია.
              იგი სტანდარტად 1500-იანი წლებიდან იქცა, როდესაც უცნობმა მბეჭდავმა
              ამწყობ დაზგაზე წიგნის საცდელი ეგზემპლარი დაბეჭდა. მისი ტექსტი
              არამარტო 5 საუკუნის მანძილზე შემორჩა, არამედ მან დღემდე,
              ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია.
            </p>
            <Image
              src={test}
              width={800}
              height={800}
              alt=""
              className="rounded-2xl"
            />
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
