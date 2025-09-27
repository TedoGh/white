"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  lastName: string;
  email: string;
  profession: string;
  video?: FileList;
  photo: FileList;
  nominationType: string; // ახალი ველი
  category: string; // ცალკე ველი
  myContact?: string;
  nomineeContact?: string;
};

export default function MinisterialCandidate() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const nominationTypeValue = watch("nominationType");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("profession", data.profession);
      formData.append("nominationType", data.nominationType);
      formData.append("category", data.category);

      if (data.myContact) formData.append("myContact", data.myContact);
      if (data.nomineeContact)
        formData.append("nomineeContact", data.nomineeContact);
      if (data.video?.[0]) formData.append("video", data.video[0]);
      if (data.photo?.[0]) formData.append("photo", data.photo[0]);

      const res = await fetch("/api/send", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess("გაგზავნა წარმატებით შესრულდა ✅");
        reset();
        setPhotoName(null);
      } else {
        const text = await res.text();
        setSuccess("გაგზავნა ვერ მოხერხდა ❌ " + text);
      }
    } catch (err) {
      setSuccess("შეცდომა ❌ " + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ნომინირების არჩევა */}
      <div className="flex flex-col mb-6">
        <select
          {...register("nominationType", { required: "აირჩიე ნომინირება." })}
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
          defaultValue=""
        >
          <option value="" disabled>
            აირჩიე ნომინირება
          </option>
          <option value="self">ჩემი ნომინირება</option>
          <option value="other">სხვისი ნომინირება</option>
        </select>
        {errors.nominationType && (
          <p className="text-red-500 text-sm mt-2">
            {errors.nominationType.message}
          </p>
        )}
      </div>

      {/* სახელი */}
      <div className="flex flex-col mb-6">
        <input
          {...register("name", { required: "სახელი აუცილებელია." })}
          type="text"
          placeholder="სახელი"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
        )}
      </div>

      {/* გვარი */}
      <div className="flex flex-col mb-6">
        <input
          {...register("lastName", { required: "გვარი აუცილებელია." })}
          type="text"
          placeholder="გვარი"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-2">{errors.lastName.message}</p>
        )}
      </div>

      {/* ელფოსტა */}
      <div className="flex flex-col mb-6">
        <input
          {...register("email", {
            required: "ელფოსტა აუცილებელია.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "არასწორი ელფოსტა",
            },
          })}
          type="email"
          placeholder="ელფოსტა"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
        )}
      </div>

      {/* ჩემი საკონტაქტო ნომერი */}
      {(nominationTypeValue === "self" || nominationTypeValue === "other") && (
        <div className="flex flex-col mb-6">
          <input
            {...register("myContact", {
              required: "ჩემი საკონტაქტო ნომერი აუცილებელია.",
            })}
            type="text"
            placeholder="ჩემი საკონტაქტო ნომერი"
            className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
          />
          {errors.myContact && (
            <p className="text-red-500 text-sm mt-2">
              {errors.myContact.message}
            </p>
          )}
        </div>
      )}

      {/* ნომინირებულის საკონტაქტო */}
      {nominationTypeValue === "other" && (
        <div className="flex flex-col mb-6">
          <input
            {...register("nomineeContact", {
              required: "ნომინირებულის საკონტაქტო აუცილებელია.",
            })}
            type="text"
            placeholder="ნომინირებულის საკონტაქტო ნომერი"
            className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
          />
          {errors.nomineeContact && (
            <p className="text-red-500 text-sm mt-2">
              {errors.nomineeContact.message}
            </p>
          )}
        </div>
      )}

      {/* კატეგორია */}
      <div className="flex flex-col mb-6">
        <select
          {...register("category", { required: "აირჩიე კატეგორია." })}
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
          defaultValue=""
        >
          <option value="" disabled>
            აირჩიე კატეგორია
          </option>
          <option value="test1">სატესტო 1</option>
          <option value="test2">სატესტო 2</option>
          <option value="test3">სატესტო 3</option>
          <option value="test4">სატესტო 4</option>
          <option value="test5">სატესტო 5</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>
        )}
      </div>

      {/* პროფესია */}
      <div className="flex flex-col mb-6">
        <input
          {...register("profession", { required: "პროფესია აუცილებელია." })}
          type="text"
          placeholder="პროფესია"
          className="w-full h-[60px] rounded-lg px-5 border-2 border-[#000]"
        />
        {errors.profession && (
          <p className="text-red-500 text-sm mt-2">
            {errors.profession.message}
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
          <p className="text-red-500 text-sm mt-2">{errors.photo.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-[60px] bg-black text-white rounded-lg"
      >
        {loading ? "იგზავნება..." : "გაგზავნა"}
      </button>

      {success && <p className="mt-4">{success}</p>}
    </form>
  );
}
