import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Player from "../components/Player";

export default function Home() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      const res = await fetch("/api/spotify");
      const data = await res.json();
      setTrack(data);
    };
    fetchTrack();
  }, []);

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
        <Player track={track} />
      </motion.div>
    </div>
  );
}
