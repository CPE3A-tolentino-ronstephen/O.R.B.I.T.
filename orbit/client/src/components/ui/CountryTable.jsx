import { fmt, riskColor } from "../../utils/format";
import { SkeletonRows } from "./Skeleton";

function CountryRow({ item, rank, onClick, selected }) {
  const rc = riskColor(item.riskScore);
  return (
    <tr
      onClick={onClick}
      className={selected ? "selected" : ""}
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick()}
    >
      <td>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--gray-400)", fontSize: "12.48px" }}>
          {String(rank).padStart(2, "0")}
        </span>
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "9.6px" }}>
          {item.flag && (
            <img src={item.flag} alt="" style={{ width: 22, height: 14, objectFit: "cover", borderRadius: 2, flexShrink: 0 }} />
          )}
          <span style={{ fontWeight: 600, fontSize: "14px" }}>{item.country}</span>
        </div>
      </td>
      <td className="hide-mobile" style={{ fontFamily: "var(--font-mono)", fontSize: "13.12px" }}>
        {fmt.compact(item.cases)}
      </td>
      <td className="hide-mobile" style={{ fontFamily: "var(--font-mono)", fontSize: "13.12px", color: "var(--risk-critical)" }}>
        {fmt.compact(item.deaths)}
      </td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div className="risk-bar" style={{ width: 56, flexShrink: 0 }}>
            <div className="risk-bar-fill" style={{ width: `${item.riskScore}%`, background: rc }} />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11.52px", color: rc, fontWeight: 700 }}>
            {item.riskScore}
          </span>
        </div>
      </td>
    </tr>
  );
}

export default function CountryTable({ countries, loading, onSelect, selected, sortBy, onSortChange, search, onSearchChange }) {
  return (
    <div className="country-table-card card" style={{ padding: 0 }}>
      <style>{`
        .country-table-card { 
          overflow: hidden; 
        }
        .ct-toolbar {
          display: flex; 
          align-items: center; 
          gap: 12px;
          padding: 16px 20px; 
          border-bottom: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .ct-title { 
          font-weight: 700; 
          color: var(--gray-900); 
          flex: 1; 
          font-size: 14.4px; 
        }
        .ct-search {
          padding: 6.72px 14px; 
          border: 1px solid var(--border);
          border-radius: var(--radius-sm); 
          font-family: var(--font-body);
          font-size: 14px; 
          color: var(--gray-700); 
          background: var(--gray-50);
          outline: none; 
          width: 170px; 
          transition: border-color .15s;
        }
        .ct-search:focus { 
          border-color: var(--orbit-green); 
          background: white; 
        }
        .ct-sort {
          padding: 6.72px 12px; 
          border: 1px solid var(--border);
          border-radius: var(--radius-sm); 
          font-family: var(--font-body);
          font-size: 14px; 
          color: var(--gray-700); 
          background: var(--gray-50);
          outline: none; 
          cursor: pointer;
        }
        .ct-body { 
          overflow-y: auto; 
          max-height: 500px; 
        }
      `}</style>

      <div className="ct-toolbar">
        <div className="ct-title">Countries — {countries.length} tracked</div>
        <input
          className="ct-search"
          placeholder="🔍 Search country..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <select className="ct-sort" value={sortBy} onChange={e => onSortChange(e.target.value)}>
          <option value="cases">Sort: Cases</option>
          <option value="deaths">Sort: Deaths</option>
          <option value="active">Sort: Active</option>
          <option value="riskScore">Sort: Risk</option>
        </select>
      </div>

      <div className="ct-body">
        {loading ? <SkeletonRows count={8} /> : (
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Country</th>
                <th className="hide-mobile">Cases</th>
                <th className="hide-mobile">Deaths</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {countries.slice(0, 100).map((c, i) => (
                <CountryRow
                  key={`${c.countryCode}-${i}`}
                  item={c}
                  rank={i + 1}
                  selected={selected?.country === c.country}
                  onClick={() => onSelect(c)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
