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

const CardItem = ({ data }: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
      <div
        key={data.id}
        className="w-[400px] h-[400px] border-2 border-black rounded-2xl cursor-pointer"
        onClick={() => setOpenModal(data)} // გახსნის მოდალს
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
