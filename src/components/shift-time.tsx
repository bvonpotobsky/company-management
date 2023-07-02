import React, {useState, useEffect} from "react";

const ShiftTime: React.FC<{startTime: number}> = ({startTime}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = currentTime - startTime;
      setElapsedTime(timeDifference);
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>Shift Time</h1>
      <p>Elapsed Time: {formatTime(elapsedTime)}</p>
    </div>
  );
};

export default ShiftTime;
