"use client";
import { useRouter } from "next/navigation";

export default function RoleSelect() {
  const router = useRouter();

  const handleSelect = (role: string) => {
    if (role === "resident") {
      router.push("/dashboard"); // Resident dashboard
    } else if (role === "manager") {
      router.push("/manager-dashboard"); // Estate Manager dashboard
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl backdrop-blur-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Welcome to <span className="text-sky-600">Ochiga</span>
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Select your role to continue
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Resident Card */}
          <button
            onClick={() => handleSelect("resident")}
            className="flex flex-col items-center justify-center p-6 space-y-3 bg-gradient-to-tr from-sky-500 to-sky-600 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5V9l-10-7L2 9v11h5m10 0V10m0 10H7m10 0h-4"
              />
            </svg>
            <span className="font-medium text-lg">Resident</span>
          </button>

          {/* Estate Manager Card */}
          <button
            onClick={() => handleSelect("manager")}
            className="flex flex-col items-center justify-center p-6 space-y-3 bg-gradient-to-tr from-gray-700 to-gray-900 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
            <span className="font-medium text-lg">Estate Manager</span>
          </button>
        </div>
      </div>
    </div>
  );
}
