import { riskColor } from "../../utils/format";

export default function RiskBadge({ label, score, showBar = false }) {
  if (!label) return null;
  const color = riskColor(score ?? 0);
  const cls = label.toLowerCase();

  return (
    <div>
      <span className={`badge badge-${cls}`}>{label} Risk</span>
      {showBar && (
        <div style={{ marginTop: "6.4px" }}>
          <div className="risk-bar" style={{ width: "100%" }}>
            <div
              className="risk-bar-fill"
              style={{ width: `${score}%`, background: color }}
            />
          </div>
          <div style={{ 
            fontSize: "11.2px", 
            color: "var(--gray-400)", 
            fontFamily: "var(--font-mono)", 
            marginTop: "3.2px" 
          }}>
            Score: {score}/100
          </div>
        </div>
      )}
    </div>
  );
}
