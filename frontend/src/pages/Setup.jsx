import { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";

export default function Setup({ onStart }) {
  const [title, setTitle] = useState("My Record Writing");
  const [total, setTotal] = useState("49");

  const handleSubmit = (e) => {
    e.preventDefault();

    const pages = Number(total);

    if (!Number.isInteger(pages) || pages < 1) return;

    onStart(pages, title.trim() || "My Writing Session");
  };

  return (
    <div className="setup-page">
      <div className="setup-card">
        <div className="setup-logo">
          <BookOpen size={30} />
        </div>

        <span className="eyebrow">WELCOME TO WRITEFLOW</span>

        <h1>Every page brings you closer.</h1>

        <p className="setup-description">
          Set your writing target. We'll track your progress,
          writing speed and estimated finishing time.
        </p>

        <form onSubmit={handleSubmit}>
          <label>SESSION NAME</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter session name"
            maxLength={80}
          />

          <label>TOTAL NUMBER OF PAGES</label>
          <input
            type="number"
            min="1"
            max="10000"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />

          <button type="submit" className="primary-button">
            Start Writing <ArrowRight size={18} />
          </button>
        </form>

        <div className="setup-footer">
          YOUR PROGRESS. YOUR PACE. YOUR SUCCESS.
        </div>
      </div>
    </div>
  );
}