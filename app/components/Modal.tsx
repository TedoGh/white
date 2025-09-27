"use client";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoUrl?: string;
};

const Modal = ({ isOpen, onClose, title, videoUrl }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-2xl w-full relative p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* დახურვა */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* სახელი */}
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        {/* ვიდეო */}
        {videoUrl && (
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
