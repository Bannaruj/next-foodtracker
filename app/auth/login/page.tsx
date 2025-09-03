// app/login/page.tsx

"use client"; // ประกาศเป็น Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/dashboard");
    // เพิ่ม Logic สำหรับการ Login ตรวจสอบข้อมูลกับ API ของคุณที่นี่
    console.log("Login form submitted!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 p-4">
      <main className="container mx-auto flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-2xl shadow-lg max-w-sm p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">Login to continue tracking.</p>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-green-400"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition-transform hover:scale-105"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Don{"'"}t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-bold text-green-600 hover:text-green-800 transition-colors"
          >
            Register here
          </Link>
        </p>
      </main>
    </div>
  );
}
