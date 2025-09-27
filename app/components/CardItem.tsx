"use client";
import React, { useState } from "react";
import person from "../components/person.jpg";
import Image from "next/image";
import Modal from "./Modal";

interface DataItem {
  id: number;
  title: string;
  profesia: string;
  video: string;
}

interface CardItemProps {
  data: DataItem;
}

const CardItem = ({ data }: CardItemProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  console.log(data);
  return (
    <div>
      <div
        key={data.id}
        className="w-[400px] h-[400px] border-2 border-black rounded-2xl cursor-pointer"
        onClick={() => setOpenModal(true)} // გახსნის მოდალს
      >
        <Image
          src={person}
          width={400}
          height={400}
          alt={data.title}
          className="rounded-t-2xl"
        />
        <div className="p-4">
          <h1 className="font-bold mb-1">{data.title}</h1>
          <p>{data.profesia}</p>
        </div>
      </div>
      <Modal
        isOpen={!!openModal}
        onClose={() => setOpenModal(false)}
        title={data?.title}
        videoUrl={data?.video}
      />
    </div>
  );
};

export default CardItem;
