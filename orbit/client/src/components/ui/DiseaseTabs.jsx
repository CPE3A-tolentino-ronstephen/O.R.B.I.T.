export const ALL_DISEASES = [
  { key: "covid19", label: "COVID-19", icon: "🦠", color: "#3b82f6" },
  { key: "mpox", label: "Mpox", icon: "🧬", color: "#8b5cf6" },
  { key: "influenza", label: "Influenza", icon: "🌡", color: "#f59e0b" },
  { key: "tuberculosis", label: "Tuberculosis", icon: "🫁", color: "#7c3aed" },
  { key: "dengue", label: "Dengue", icon: "🦟", color: "#d97706" },
  { key: "cholera", label: "Cholera", icon: "💧", color: "#0891b2" },
  { key: "measles", label: "Measles", icon: "⚕️", color: "#db2777" },
];

export default function DiseaseTabs({ active, onChange, diseases = ALL_DISEASES }) {
  return (
    <div className="disease-tabs">
      <style>{`
        .disease-tabs { 
          display: flex; 
          gap: 6.4px; 
          flex-wrap: wrap; 
        }
        .d-tab {
          display: flex; 
          align-items: center; 
          gap: 6.4px;
          padding: 6.72px 13.6px;
          border-radius: 99px;
          font-size: 13.12px; 
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid var(--border);
          background: var(--white);
          color: var(--gray-600);
          transition: all .18s ease;
          font-family: var(--font-body);
          white-space: nowrap;
        }
        .d-tab:hover { 
          border-color: var(--orbit-green); 
          color: var(--orbit-green-dim); 
        }
        .d-tab.active {
          background: var(--orbit-green);
          color: white;
          border-color: var(--orbit-green);
          box-shadow: var(--shadow-green);
        }
      `}</style>
      {diseases.map(d => (
        <button
          key={d.key}
          className={`d-tab ${active === d.key ? "active" : ""}`}
          onClick={() => onChange(d.key)}
        >
          {d.icon} {d.label}
        </button>
      ))}
    </div>
  );
}
