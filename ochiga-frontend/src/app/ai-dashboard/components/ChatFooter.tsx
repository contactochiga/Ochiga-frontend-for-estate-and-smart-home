"use client";

import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

export default function ChatFooter({
  input,
  setInput,
  listening,
  onMicClick,
  onSend,
}: {
  input: string;
  setInput: (v: string) => void;
  listening: boolean;
  onMicClick: () => void;
  onSend: () => void;
}) {
  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-700 px-4 py-3 fixed bottom-0">
      <div className="max-w-3xl mx-auto flex items-center space-x-3">
        {/* Input field (now comes first) */}
        <input
          type="text"
          placeholder="Ask Ochiga AI anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Mic button — now placed after input and before send */}
        <button
          onClick={onMicClick}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
            listening
              ? "bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)] scale-110"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <FaMicrophone />
        </button>

        {/* Send button (last) */}
        <button
          onClick={onSend}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          <FaPaperPlane className="text-white text-sm" />
        </button>
      </div>
    </footer>
  );
}
