"use client";

import { useState, useEffect, use } from "react"; // 1. เพิ่มการ import 'use'
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const mockFoodData = [
  {
    id: 1,
    date: "2025-09-03",
    name: "Spaghetti Carbonara",
    meal: "Dinner",
    imageUrl: "https://placehold.co/600x400/5e8a64/ffffff?text=Spaghetti",
  },
  {
    id: 2,
    date: "2025-09-03",
    name: "Avocado Toast",
    meal: "Breakfast",
    imageUrl: "https://placehold.co/600x400/a3bf8f/ffffff?text=Avocado+Toast",
  },
  {
    id: 3,
    date: "2025-09-02",
    name: "Chicken Caesar Salad",
    meal: "Lunch",
    imageUrl: "https://placehold.co/600x400/e8d3a6/ffffff?text=Salad",
  },
];

interface FoodItem {
  id: number;
  date: string;
  name: string;
  meal: "Breakfast" | "Lunch" | "Dinner" | "Snack" | string;
  imageUrl: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditFoodPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // 4. ใช้ 'id' ที่ได้จาก use hook
    const foodId = parseInt(id, 10);
    const itemToEdit = mockFoodData.find((item) => item.id === foodId);

    if (itemToEdit) {
      setFoodItem(itemToEdit);
      setImagePreview(itemToEdit.imageUrl);
    } else {
      alert("Food item not found!");
      router.push("/dashboard");
    }
  }, [id, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!foodItem) return;
    const { name, value } = e.target;
    setFoodItem((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Saving updated food item:", {
      ...foodItem,
      newImage: imagePreview,
    });
    alert("Food item updated successfully!");
    router.push("/dashboard");
  };

  if (!foodItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading food data...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto bg-white rounded-2xl shadow-xl max-w-lg p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Edit Meal
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Food Picture
            </label>
            <div className="relative w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-300 overflow-hidden">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Food Preview"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <span className="text-gray-500">No Image Preview</span>
              )}
            </div>
            <label
              htmlFor="foodPicture"
              className="w-full text-center cursor-pointer bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors block"
            >
              Change Image
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

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Food Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={foodItem.name}
              onChange={handleInputChange}
              required
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meal"
            >
              Meal
            </label>
            <select
              id="meal"
              name="meal"
              value={foodItem.meal}
              onChange={handleInputChange}
              className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={foodItem.date}
              onChange={handleInputChange}
              required
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/dashboard" passHref className="w-full">
              <button
                type="button"
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105"
            >
              Update Meal
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
