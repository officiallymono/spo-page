import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Player = ({ track }) => {
  if (!track) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="flex flex-col items-center bg-black min-h-screen justify-center text-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm bg-[#181818] p-6 rounded-2xl shadow-lg"
      >
        <Image
          src={track.albumImageUrl}
          alt="Album Cover"
          width={300}
          height={300}
          className="rounded-xl"
        />
        <h2 className="text-lg font-bold mt-4">{track.title}</h2>
        <p className="text-gray-400">{track.artist}</p>
        <div className="w-full bg-gray-700 h-1.5 rounded-full mt-4">
          <div
            className="bg-green-500 h-1.5 rounded-full"
            style={{ width: `${track.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>{track.currentTime}</span>
          <span>{track.duration}</span>
        </div>
        <a
          href={`https://odesli.co/${track.spotifyUrl}`}
          target="_blank"
          className="mt-4 block text-green-400 hover:underline"
        >
          Other Links
        </a>
      </motion.div>
    </div>
  );
};

export default Player;
