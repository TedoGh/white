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
  nominationType: string; // ნომინაციის ტიპი
  category: string; // სამინისტრო
  experience: string; // სამუშაო გამოცდილება
  message: string; // მიზეზი
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
      formData.append("experience", data.experience);
      formData.append("message", data.message);

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
          <option value="self">ვასახელებ ჩემ თავს</option>
          <option value="other">ვასახელებ სხვას</option>
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
          <option value="test1">საქართველოს საგარეო საქმეთა სამინისტრო</option>
          <option value="test2">საქართველოს თავდაცვის სამინისტრო</option>
          <option value="test3">საქართველოს შინაგან საქმეთა სამინისტრო</option>
          <option value="test4">
            საქართველოს განათლების, მეცნიერებისა და ახალგაზრდობის სამინისტრო
          </option>
          <option value="test5">საქართველოს კულტურის სამინისტრო</option>
          <option value="test6">
            საქართველოს ეკონომიკისა და მდგრადი განვითარების სამინისტრო
          </option>
          <option value="test7">საქართველოს ფინანსთა სამინისტრო</option>
          <option value="test8">
            ოკუპირებული ტერიტორიებიდან დევნილთა, შრომის, ჯანმრთელობისა და
            სოციალური დაცვის სამინისტრო
          </option>
          <option value="test9">საქართველოს იუსტიციის სამინისტრო</option>
          <option value="test10">
            საქართველოს გარემოს დაცვისა და სოფლის მეურნეობის სამინისტრო
          </option>
          <option value="test11">
            საქართველოს რეგიონული განვითარებისა და ინფრასტრუქტურის სამინისტრო
          </option>
          <option value="test12">
            შერიგებისა და სამოქალაქო თანასწორობის საკითხებში საქართველოს
            სახელმწიფო მინისტრის აპარატი
          </option>
          <option value="test13">
            საქართველოს სპორტისა და ახალგაზრდობის საქმეთა სამინისტრო
          </option>
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

      {/* სამუშაო გამოცდილება */}
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

      {/* მესიჯი */}
      <div className="flex flex-col mb-6">
        <textarea
          {...register("message", {
            required: "მიზეზი აუცილებელია.",
            minLength: {
              value: 10,
              message: "მინ. 10 სიმბოლო.",
            },
            maxLength: {
              value: 500,
              message: "მაქს. 500 სიმბოლო.",
            },
          })}
          placeholder="რატომ არის კანდიდატი შესაფერისი?"
          className="w-full h-[190px] py-[18px] px-5 rounded-lg border-2 border-[#000] resize-none"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-4">{errors.message.message}</p>
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
        className="w-full h-[60px] bg-black text-white rounded-lg cursor-pointer"
      >
        {loading ? "იგზავნება..." : "გაგზავნა"}
      </button>

      {success && <p className="mt-4">{success}</p>}
    </form>
  );
}
