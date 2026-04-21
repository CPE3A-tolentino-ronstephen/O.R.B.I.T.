import { fmt, riskColor } from "../../utils/format";
import RiskBadge from "./RiskBadge";

export default function CountryDetail({ country, onClose }) {
  if (!country) return (
    <div className="country-detail-empty">
      <style>{`
        .country-detail-empty {
          display: flex; 
          flex-direction: column; 
          align-items: center;
          justify-content: center; 
          padding: 40px 24px;
          text-align: center; 
          gap: 12px; 
          color: var(--gray-400);
        }
        .cde-icon { 
          font-size: 40px; 
          opacity: .4; 
        }
        .cde-text { 
          font-size: 14px; 
          line-height: 1.6; 
        }
      `}</style>
      <div className="cde-icon">🌍</div>
      <p className="cde-text">Select a country to see detailed outbreak statistics</p>
    </div>
  );

  const rows = [
    { label: "Total Cases", value: fmt.number(country.cases), color: null },
    { label: "Deaths", value: fmt.number(country.deaths), color: "var(--risk-critical)" },
    { label: "Recovered", value: fmt.number(country.recovered), color: "var(--orbit-green)" },
    { label: "Active", value: fmt.number(country.active), color: null },
    { label: "Critical", value: fmt.number(country.critical), color: null },
    { label: "Cases / 1M", value: fmt.number(country.casesPerMillion), color: null },
    { label: "Deaths / 1M", value: fmt.number(country.deathsPerMillion), color: null },
    { label: "Today Cases", value: `+${fmt.number(country.todayCases)}`, color: null },
    { label: "Today Deaths", value: `+${fmt.number(country.todayDeaths)}`, color: null },
    country.year && { label: "Data Year", value: country.year, color: null },
    country.incidencePer100k && {
      label: "Per 100k",
      value: Number(country.incidencePer100k).toFixed(1),
      color: null,
    },
  ].filter(Boolean);

  return (
    <div className="country-detail">
      <style>{`
        .country-detail { 
          display: flex; 
          flex-direction: column; 
        }
        .cd-header {
          padding: 20px 20px 14px;
          border-bottom: 1px solid var(--border);
        }
        .cd-header-top {
          display: flex; 
          align-items: center; 
          gap: 9.6px; 
          margin-bottom: 9.6px;
        }
        .cd-flag { 
          width: 32px; 
          height: 20px; 
          object-fit: cover; 
          border-radius: 3px; 
          flex-shrink: 0; 
        }
        .cd-name { 
          font-size: 16px; 
          font-weight: 800; 
          color: var(--gray-900); 
        }
        .cd-close {
          margin-left: auto; 
          background: none; 
          border: none;
          cursor: pointer; 
          color: var(--gray-400); 
          font-size: 16px;
          transition: color .15s;
        }
        .cd-close:hover { 
          color: var(--risk-critical); 
        }
        .cd-body { 
          padding: 12px 20px 20px; 
        }
        .cd-row {
          display: flex; 
          justify-content: space-between; 
          align-items: center;
          padding: 6.72px 0; 
          border-bottom: 1px solid var(--border);
          font-size: 13.12px;
        }
        .cd-row:last-child { 
          border-bottom: none; 
        }
        .cd-label { 
          color: var(--gray-500); 
        }
        .cd-value { 
          font-weight: 700; 
          font-family: var(--font-mono); 
          color: var(--gray-900); 
        }
        .cd-updated {
          margin-top: 12px; 
          font-size: 11.52px;
          color: var(--gray-400); 
          font-family: var(--font-mono);
        }
      `}</style>

      <div className="cd-header">
        <div className="cd-header-top">
          {country.flag && <img src={country.flag} alt="" className="cd-flag" />}
          <div className="cd-name">{country.country}</div>
          {onClose && (
            <button className="cd-close" onClick={onClose}>✕</button>
          )}
        </div>
        <RiskBadge label={country.risk?.label} score={country.riskScore} showBar />
      </div>

      <div className="cd-body">
        {rows.map(({ label, value, color }) => (
          <div className="cd-row" key={label}>
            <span className="cd-label">{label}</span>
            <span className="cd-value" style={color ? { color } : {}}>{value}</span>
          </div>
        ))}
        {country.updated && (
          <div className="cd-updated">
            Updated: {fmt.relativeTime(country.updated)}
          </div>
        )}
      </div>
    </div>
  );
}
