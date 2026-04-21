export default function StatCard({ label, value, sub, accent = "var(--orbit-green)", loading }) {
  return (
    <div className="stat-card card" style={{ "--accent": accent }}>
      <style>{`
        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px 24px;
          border-left: 3px solid var(--accent);
        }
        .stat-card-label {
          font-size: 11.52px; 
          font-weight: 600;
          text-transform: uppercase; 
          letter-spacing: .07em;
          color: var(--gray-400); 
          font-family: var(--font-mono);
        }
        .stat-card-val {
          font-family: var(--font-display);
          font-size: 28.8px; 
          font-weight: 800;
          color: var(--gray-900); 
          letter-spacing: -.03em; 
          line-height: 1;
        }
        .stat-card-sub { 
          font-size: 12.8px; 
          color: var(--gray-400); 
        }
        .skel-stat { 
          height: 32px; 
          width: 112px; 
        }
      `}</style>
      <div className="stat-card-label">{label}</div>
      {loading
        ? <div className="skeleton skel-stat" />
        : <div className="stat-card-val">{value ?? "—"}</div>
      }
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
}
