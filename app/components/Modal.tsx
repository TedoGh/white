"use client";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoUrl?: string;
};

const Modal = ({ isOpen, onClose, title, videoUrl }: ModalProps) => {
  if (!isOpen) return null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
        >
          <IoCloseOutline color="#000" size={24} />
        </button>

        {/* სახელი */}
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        {/* ვიდეო */}
        {videoUrl && (
          <div className="relative w-full">
            <Plyr
              source={{
                type: "video",
                sources: [
                  {
                    src: videoUrl, // პირდაპირი mp4 URL
                    provider: "html5",
                  },
                ],
              }}
              controls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
