"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  lastName: string;
  email: string;
  profession: string;
  experience: string;
  video: FileList;
  photo: FileList;
};

export default function VolunteerForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const photoRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("profession", data.profession);
      formData.append("experience", data.experience);

      if (data.video?.[0]) {
        formData.append("video", data.video[0]);
      }
      if (data.photo?.[0]) {
        formData.append("photo", data.photo[0]);
      }

      const res = await fetch("/api/send", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess("Message sent successfully ✅");
        reset();
        setVideoName(null);
        setPhotoName(null);
        if (photoRef.current) photoRef.current.value = "";
        if (videoRef.current) videoRef.current.value = "";
      } else {
        const text = await res.text();
        setSuccess("Failed to send ❌ " + text);
      }
    } catch (err) {
      setSuccess("Error occurred ❌ " + (err as Error).message);
    }

    setLoading(false);
  };

  // ✅ ვიდეოს 15 წამზე შემოწმება
  const validateVideo = (file: File) => {
    return new Promise<string | true>((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.src = url;

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        if (video.duration > 15) {
          resolve("ვიდეო მაქსიმუმ 15 წამი უნდა იყოს");
        } else {
          setVideoName(file.name);
          resolve(true);
        }
      };
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* სახელი */}
      <div className="flex flex-col mb-6">
        <input
          {...register("name", { required: "სახელი აუცილებელია." })}
          type="text"
          placeholder="სახელი"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
      </div>
      {errors.name && (
        <p className="text-red-500 text-sm mb-3">
          {errors.name.message?.toString()}
        </p>
      )}

      {/* გვარი */}
      <div className="flex flex-col mb-6">
        <input
          {...register("lastName", { required: "გვარი აუცილებელია." })}
          type="text"
          placeholder="გვარი"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
      </div>
      {errors.lastName && (
        <p className="text-red-500 text-sm mb-3">
          {errors.lastName.message?.toString()}
        </p>
      )}

      {/* ელფოსტა */}
      <div className="flex flex-col mb-6">
        <input
          {...register("email", {
            required: "ელ.ფოსტა აუცილებელია.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "ელ.ფოსტა არასწორია",
            },
          })}
          type="email"
          placeholder="ელ.ფოსტა"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm mb-3">
          {errors.email.message?.toString()}
        </p>
      )}

      {/* პროფესია */}
      <div className="flex flex-col mb-6">
        <input
          {...register("profession", { required: "პროფესია აუცილებელია." })}
          type="text"
          placeholder="პროფესია"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
      </div>
      {errors.profession && (
        <p className="text-red-500 text-sm mb-3">
          {errors.profession.message?.toString()}
        </p>
      )}

      {/* გამოცდილება */}
      <div className="flex flex-col mb-6">
        <select
          {...register("experience", { required: "სამუშაო გამოცდილება." })}
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
          defaultValue=""
        >
          <option value="" disabled>
            სამუშაო გამოცდილება
          </option>
          <option value="1-5">1-5 წელი</option>
          <option value="6-10">6-10 წელი</option>
          <option value="11-15">11-15 წელი</option>
          <option value="15-20">15-20 წელი</option>
          <option value="20+">20 + წელი</option>
        </select>
        {errors.experience && (
          <p className="text-red-500 text-sm mt-2">
            {errors.experience.message}
          </p>
        )}
      </div>

      {/* ფოტო */}
      <div className="flex flex-col mb-6">
        <label
          htmlFor="photo"
          className="w-full h-[60px] flex items-center justify-center rounded-lg px-5 border-2 border-[#000] cursor-pointer hover:bg-gray-100 font-bold"
        >
          {photoName ? `🖼️ ${photoName}` : "ფოტოს ატვირთვა"}
        </label>
        <input
          id="photo"
          // ref={photoRef}
          type="file"
          accept="image/*"
          className="hidden"
          {...register("photo", {
            required: "ფოტოს ატვირთვა აუცილებელია.",
            onChange: (e) => {
              if (e.target.files && e.target.files.length > 0) {
                setPhotoName(e.target.files[0].name);
              }
            },
          })}
        />
        {errors.photo && (
          <p className="text-red-500 text-sm mt-3">
            {errors.photo.message?.toString()}
          </p>
        )}
      </div>

      {/* ვიდეო */}
      <div className="flex flex-col mb-6">
        <label
          htmlFor="video"
          className="w-full h-[60px] flex items-center justify-center rounded-lg px-5 border-2 border-[#000] cursor-pointer hover:bg-gray-100 font-bold"
        >
          {videoName ? `📹 ${videoName}` : "ვიდეოს ატვირთვა (მაქს. 15 წამი)"}
        </label>
        <input
          id="video"
          // ref={videoRef}
          type="file"
          accept="video/*"
          className="hidden"
          {...register("video", {
            required: "ვიდეოს ატვირთვა აუცილებელია.",
            validate: {
              duration: (files) =>
                files && files[0] ? validateVideo(files[0]) : true,
            },
          })}
        />
        {errors.video && (
          <p className="text-red-500 text-sm mt-3">
            {errors.video.message?.toString()}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-[60px] bg-black text-white rounded-lg cursor-pointer"
      >
        {loading ? "იგზავნება..." : "გაგზავნა"}
      </button>

      {success && (
        <p
          className={`mt-4 ${
            success.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {success}
        </p>
      )}
    </form>
  );
}
