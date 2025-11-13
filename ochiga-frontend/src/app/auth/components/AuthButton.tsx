// ochiga-frontend/src/app/(auth)/components/AuthButton.tsx
"use client";

export default function AuthButton({
  label,
  onClick,
  loading,
}: {
  label: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition"
    >
      {loading ? "Please wait..." : label}
    </button>
  );
}
