"use client"
import React, { useState } from "react";
import Image from "next/image";

export default function ModelCard({
  imageUrl,
  name,
  created_at,
}: {
  imageUrl: string;
  name: string;
  created_at: string;
}) {
  const truncateTitle = (text: string, maxLetters: number) => {
    if (text && text.length > maxLetters) {
      return text.slice(0, maxLetters) + "...";
    }
    return text;
  };
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
      setLoading(false);
  };

  return (
    <div className="max-w-sm bg-black border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-60">
        <Image
          src={imageUrl}
          alt="Picture of the model"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 1)",
          }}
          loading="lazy"
          className="image-zoom"
          quality={1}
          onLoadingComplete={handleImageLoad}
        />
        {loading ? (
          <div className="flex justify-center items-center h-full w-full absolute top-0 left-0 bg-opacity-80 bg-black">
            <div role="status" className="loader">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}
        <div
          className="absolute bottom-0 left-0 w-full h-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
            backdropFilter: "blur(1px)",
            opacity: 1,
            transition: "opacity 0.3s",
          }}
        >
          <p className="text-white font-inter text-xl p-4 mt-8">
            {truncateTitle(name, 16)}
          </p>
        </div>
      </div>
    </div>
  );
}
