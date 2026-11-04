export default function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  color = "green"
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {Icon && <Icon size={20} />}
      </div>

      <div className="stat-info">
        <span>{label}</span>
        <h2>{value}</h2>
        {subtitle && <small>{subtitle}</small>}
      </div>
    </div>
  );
}