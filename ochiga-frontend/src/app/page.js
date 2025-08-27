export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="bg-yellow-400 text-black p-6 text-2xl">
        Direct Tailwind test works ✅
      </div>

      <div className="test-bg">
        Custom test-bg with @apply ✅
      </div>
    </main>
  );
}
