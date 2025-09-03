// app/profile/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

// --- Mock Data: ในแอปจริง ข้อมูลนี้จะถูกดึงมาจาก API หลัง login ---
const currentUser = {
  fullName: "Somsak Jaidee",
  email: "somsak.j@example.com",
  gender: "Male",
  profilePicture: "https://i.pravatar.cc/150?u=somsak",
};

// --- Type Definition for Clarity ---
type UserProfile = typeof currentUser;

export default function ProfilePage() {
  const [formData, setFormData] = useState<UserProfile>(currentUser);
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentUser.profilePicture
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    // เพิ่ม Logic สำหรับส่งข้อมูลที่แก้ไขแล้วไปอัปเดตที่ API
    console.log("Profile updated:", { ...formData, newImage: imagePreview });
    alert("Profile saved successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <main className="container mx-auto bg-white rounded-2xl shadow-xl max-w-md p-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Image Upload & Preview */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ring-4 ring-green-200">
              {/* {imagePreview && (
                <Image src={imagePreview} alt="Profile Preview" width={128} height={128} className="object-cover w-full h-full" />
              )} */}
            </div>
            <label
              htmlFor="profilePicture"
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Change Picture
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Full Name Input */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Gender Select */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="shadow-sm border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/dashboard" passHref className="w-full">
              <button
                type="button"
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition-transform transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
