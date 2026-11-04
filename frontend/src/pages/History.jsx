import { CalendarDays, CheckCircle2, Clock } from "lucide-react";
import { formatDate, formatTime } from "../utils/timeFormatter";
import { formatDuration } from "../utils/calculations";

export default function History({ history }) {
  return (
    <section className="history-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR JOURNEY</span>
          <h2>Writing history</h2>
        </div>
        <CalendarDays size={22} />
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <Clock size={30} />
          <h3>No completed sessions yet</h3>
          <p>Your completed sessions will appear here.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div className="history-item" key={index}>
              <div className="history-icon">
                <CheckCircle2 size={20} />
              </div>

              <div className="history-details">
                <strong>{item.title}</strong>
                <span>
                  {formatDate(item.finishedAt || item.createdAt)}
                  {" · "}
                  {formatTime(item.finishedAt || item.createdAt)}
                </span>
              </div>

              <div className="history-result">
                <strong>
                  {item.completedPages}/{item.totalPages}
                </strong>
                <small>
                  {formatDuration(item.elapsedSeconds || 0)}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}