import {format} from "date-fns";
import {useState, useEffect} from "react";

const ClockRealTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{format(currentTime, "HH:mm a | PPP")}</>;
};

export default ClockRealTime;
