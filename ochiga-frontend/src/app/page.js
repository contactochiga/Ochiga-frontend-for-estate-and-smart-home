export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-200">
      <h1 className="text-6xl font-extrabold text-purple-600 underline mb-6">
        Tailwind Works 🎉
      </h1>
      <p className="text-lg text-gray-800">
        If you can see this styled text, TailwindCSS is active.
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Test Button
      </button>
    </main>
  );
}
