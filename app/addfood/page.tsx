// app/addfood/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AddFoodPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // เพิ่ม Logic สำหรับการบันทึกข้อมูลอาหารไปยัง API ของคุณที่นี่
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data to be saved:", data);
    alert("Food saved successfully! (Check console for data)");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 p-4">
      <main className="container mx-auto flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-2xl shadow-lg max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Add a New Meal
        </h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="foodName"
            >
              Food Name
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
              id="foodName"
              name="foodName"
              type="text"
              placeholder="e.g., Chicken Salad"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mealType"
            >
              Meal
            </label>
            <select
              id="mealType"
              name="mealType"
              className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
              id="date"
              name="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Food Picture
            </label>
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-400 overflow-hidden">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Food Preview"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <span className="text-gray-500">Image Preview</span>
              )}
            </div>
            <label
              htmlFor="foodPicture"
              className="w-full text-center cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors block"
            >
              Choose File
            </label>
            <input
              id="foodPicture"
              name="foodPicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/dashboard" passHref className="w-full">
              <button
                type="button"
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105"
              >
                Back to Dashboard
              </button>
            </Link>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-105"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
