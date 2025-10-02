"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { urlFor } from "@/lib/sanityClient";

interface VideoItem {
  _id: string;
  title: string;
  profession: string;
  photo?: string; // Sanity Image object
  videoUrl?: string;
}

const CardItem = ({ data }: { data: VideoItem }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div
        key={data._id}
        className="w-[400px] h-[400px] border-2 border-black rounded-2xl cursor-pointer overflow-hidden"
        onClick={() => setOpenModal(true)}
      >
        {data.photo ? (
          <Image
            src={urlFor(data.photo).url()}
            width={400}
            height={400}
            alt={data.title}
            className="rounded-t-2xl object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="p-4">
          <h1 className="font-bold mb-1">{data.title}</h1>
          <p>{data.profession}</p>
        </div>
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={data.title}
        videoUrl={data?.videoUrl}
      />
    </div>
  );
};

export default CardItem;
