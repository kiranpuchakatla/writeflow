import { BookOpen, Settings, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
          <BookOpen size={23} />
        </div>

        <div>
          <h2>writeflow<span>.</span></h2>
          <p>SMART WRITING TRACKER</p>
        </div>
      </div>

      <div className="header-right">
        <div className="live-status">
          <Activity size={15} />
          <span>TRACKER ACTIVE</span>
        </div>

        <button className="icon-button" title="Settings">
          <Settings size={19} />
        </button>
      </div>
    </header>
  );
}