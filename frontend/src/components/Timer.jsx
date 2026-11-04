import { Clock } from "lucide-react";
import { formatDuration } from "../utils/calculations";

export default function Timer({ elapsed }) {
  return (
    <div className="timer-display">
      <Clock size={19} />
      <span>{formatDuration(elapsed)}</span>
    </div>
  );
}