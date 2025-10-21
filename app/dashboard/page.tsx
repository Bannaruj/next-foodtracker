"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const mockFoodData = [
  {
    id: 1,
    date: "2025-09-03",
    name: "Spaghetti Carbonara",
    meal: "Dinner",
    imageUrl: "https://picsum.photos/id/10/200/200",
  },
  {
    id: 2,
    date: "2025-09-03",
    name: "Avocado Toast",
    meal: "Breakfast",
    imageUrl: "https://picsum.photos/id/20/200/200",
  },
  {
    id: 3,
    date: "2025-09-02",
    name: "Chicken Caesar Salad",
    meal: "Lunch",
    imageUrl: "https://picsum.photos/id/30/200/200",
  },
];

const ITEMS_PER_PAGE = 5;

export default function DashBoardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    return mockFoodData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-300 p-4 sm:p-6 lg:p-8">
      <main className="container mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link href="/profile" passHref>
              <div className="cursor-pointer">
                <img
                  src="https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff&rounded=true&size=48"
                  alt="Profile Avatar"
                  className="w-12 h-12 rounded-full border-2 border-purple-300 shadow-sm hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search food..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16.65 10.35a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z"
                ></path>
              </svg>
            </div>
          </div>
          <Link href="/addfood" passHref>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-transform transform hover:scale-105">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <span>Add Food</span>
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Picture</th>
                <th className="p-4 font-semibold text-gray-600">Food</th>
                <th className="p-4 font-semibold text-gray-600">Meal</th>
                <th className="p-4 font-semibold text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{item.date}</td>
                    <td className="p-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                        {item.meal}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
                          ></path>
                        </svg>
                      </button>
                      <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors ml-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-gray-500">
                    No food found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
