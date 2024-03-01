"use client";
import { useEffect, useState } from "react";

interface LoadingProps {
  interval: number; // Interval in milliseconds for the progress cycle
}

const Loading: React.FC<LoadingProps> = ({ interval }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        // Increment progress if it's less than 100, otherwise reset to 0
        return prevProgress < 100 ? prevProgress + 10 : 0;
      });
    }, interval);

    // Clear interval on component unmount
    return () => clearInterval(progressInterval);
  }, [interval]);

  return (
    <div className="w-full flex items-center justify-center pt-[20%]">
      <div className="flex items-center w-3/4 h-1 bg-gray-300">
        <div
          className="bg-green-800 h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
