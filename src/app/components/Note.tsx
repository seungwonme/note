"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Note() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [text, setText] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const initialText = searchParams.get("text") || "";
    setText(initialText.toString());
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    const query = newText ? `?text=${encodeURIComponent(newText)}` : "";
    router.replace(`${window.location.pathname}${query}`);
  };

  const handleCopy = async () => {
    try {
      const currentURL = window.location.href;
      await navigator.clipboard.writeText(currentURL);
      setCopySuccess("URL copied to clipboard!");
      setTimeout(() => setCopySuccess(""), 2000); // 메시지 2초 후 사라짐
    } catch (error) {
      console.error(error);
      setCopySuccess("Failed to copy URL");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Sync Textarea with URL
      </h1>
      <div className="w-full flex justify-center items-center h-48">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Type something here..."
          className="p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800 text-gray-200 resize-none w-4/5 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 h-full"
        />
      </div>
      <button
        onClick={handleCopy}
        className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Copy URL
      </button>
      {copySuccess && (
        <p className="mt-4 text-sm bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text font-semibold">
          {copySuccess}
        </p>
      )}
      <footer className="mt-8 text-sm bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 text-transparent bg-clip-text font-semibold">
        Your text is automatically synced with the URL!
      </footer>
    </div>
  );
}
