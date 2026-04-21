import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TICKER_ITEMS = [
  "🦠 Global Health Surveillance",
  "📡 Disease Outbreak Data Statistics Across Countries",
  "📊 Historical Trend Analysis",
  "🗺 Interactive Outbreak Map",
  "⚡ Risk Scoring Across Nations"
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="landing page-enter">
      <style>{`
        .landing {
          min-height: 100vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
        }

        .ticker {
          background: var(--gray-900);
          color: var(--orbit-green-light);
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 8px 0;
          overflow: hidden;
          white-space: nowrap;
          letter-spacing: 0.5px;
        }
        
        .ticker-content {
          display: inline-flex;
          gap: 64px;
          animation: ticker-scroll 30s linear infinite;
        }

        .lnav {
          padding: 20px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        
        .lnav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .lnav-logo {
          width: 42px; 
          height: 42px;
          background: linear-gradient(135deg, var(--orbit-green), var(--orbit-green-dim));
          border-radius: 11px;
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 21px;
          box-shadow: var(--shadow-green);
        }
        
        .lnav-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: var(--gray-900);
          letter-spacing: 0.64px;
        }
        
        .lnav-sub {
          font-size: 11px;
          color: var(--gray-400);
          font-family: var(--font-mono);
        }
        
        .lnav-actions { 
          display: flex;
          gap: 12px;
          align-items: center; 
        }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 60px 64px;
          position: relative;
          overflow: hidden;
        }
        
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 50% -10%, rgba(16,185,129,.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(16,185,129,.05) 0%, transparent 60%);
          pointer-events: none;
        }
        
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--gray-100) 1px, transparent 1px),
            linear-gradient(90deg, var(--gray-100) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent);
          pointer-events: none;
          opacity: .5;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orbit-green-bg);
          border: 1px solid var(--border-em);
          color: var(--orbit-green-dim);
          padding: 4.8px 16px;
          border-radius: 99px;
          font-size: 12.8px;
          font-weight: 600;
          font-family: var(--font-mono);
          margin-bottom: 28px;
          letter-spacing: 0.5px;
        }
        
        .hero h1 {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 800;
          color: var(--gray-900);
          line-height: 1.08;
          max-width: 900px;
          margin-bottom: 20px;
          letter-spacing: -1px;
          text-align: center;
        }
        
        .hero h1 em {
          font-style: normal;
          color: var(--orbit-green);
        }
        
        .hero-tagline {
          font-size: 18.4px;
          color: var(--gray-500);
          max-width: 560px;
          margin-bottom: 40px;
          line-height: 1.7;
        }
        
        .hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 56px;
        }
        
        .hero-stats {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          justify-content: center;
          padding-top: 40px;
          border-top: 1px solid var(--border);
          position: relative;
          z-index: 1;
        }
        
        .hero-stat {
          text-align: center;
        }
        
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--gray-900);
          letter-spacing: -.04em;
          display: block;
        }
        
        .hero-stat-label {
          font-size: 12.8px;
          color: var(--gray-400);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .features {
          padding: 80px 60px;
          background: var(--gray-50);
          border-top: 1px solid var(--border);
        }
        
        .section-label {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--orbit-green);
          margin-bottom: 12px;
        }
        
        .section-title {
          font-size: 40px;
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: 48px;
          max-width: 500px;
          letter-spacing: -0.8px;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        
        .feature-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--orbit-green-bg), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        .feature-card:hover { 
          box-shadow: var(--shadow-lg); 
          transform: translateY(-3px); 
          border-color: var(--border-em); 
        }
        
        .feature-card:hover::before { 
          opacity: 1; 
        }
        
        .feature-icon {
          width: 48px; 
          height: 48px;
          background: var(--orbit-green-bg);
          border: 1px solid var(--border-em);
          border-radius: 12px;
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 22px;
          margin-bottom: 16px;
          position: relative;
        }
        
        .feature-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--gray-900);
          margin-bottom: 8px;
          position: relative;
        }
        
        .feature-card p {
          font-size: 14px;
          color: var(--gray-500);
          line-height: 1.6;
          position: relative;
        }

        .landing-footer {
          padding: 32px 60px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .landing-footer p {
          font-size: 13px;
          color: var(--gray-400);
          font-family: var(--font-mono);
        }
        
        .footer-links { 
          display: flex; 
          gap: 24px; 
        }
        
        .footer-links a {
          font-size: 13px;
          color: var(--gray-400);
          text-decoration: none;
          transition: color 0.15s;
        }
        
        .footer-links a:hover { 
          color: var(--orbit-green); 
        }

        @media (max-width: 600px) {
          .hero-stats { 
            gap: 24px; 
          }
          .hero-actions { 
            flex-direction: column; 
            align-items: center; 
          }
          .lnav-actions .btn-ghost { 
            display: none; 
          }
        }
      `}</style>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-content">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>⬡ {item}</span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="lnav">
        <div className="lnav-brand">
          <div className="lnav-logo">🛰</div>
          <div>
            <div className="lnav-title">O.R.B.I.T.</div>
            <div className="lnav-sub">THE PULSE OF WORLD HEALTH AT YOUR FINGERTIPS</div>
          </div>
        </div>
        <div className="lnav-actions">
          <a href="#features" className="btn btn-ghost">Features</a>
          <button className="btn btn-primary" onClick={() => navigate("/auth")}>
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-badge" style={{ position: "relative", zIndex: 1 }}>
          <span className="live-dot" />
          Global Health and Disease Surveillance
        </div>

        <h1 style={{ position: "relative", zIndex: 1, maxWidth: "900px", textAlign: "center" }}>
          OUTBREAK REPORTING &{" "}
          <em>BIOLOGICAL INTELLIGENCE TRACKING</em>
        </h1>

        <p className="hero-tagline" style={{ position: "relative", zIndex: 1 }}>
          O.R.B.I.T. delivers outbreak intelligence,
          interactive outbreak maps, and deep statistical analysis across countries.
        </p>

        <div className="hero-actions" style={{ position: "relative", zIndex: 1 }}>
          <button
            className="btn btn-primary"
            style={{ padding: "14px 32px", fontSize: "16px" }}
            onClick={() => navigate("/auth")}
          >
            🛰 Launch Dashboard
          </button>
          <a
            href="#features"
            className="btn btn-ghost"
            style={{ padding: "14px 32px", fontSize: "16px" }}
          >
            Explore Features →
          </a>
        </div>

        <div className="hero-stats" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "700px" }}>
          {[
            { num: "195+", label: "Countries Tracked" },
            { num: "5", label: "Disease Streams" },
            { num: "100%", label: "API Open Data" },
          ].map(({ num, label }) => (
            <div className="hero-stat" key={label}>
              <span className="hero-stat-num">{num}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-label">Platform Capabilities</div>
        <div className="section-title">TRACKING TODAY FOR A HEALTHIER TOMORROW</div>

        <div className="features-grid">
          {[
            { icon: "🗺", title: "Interactive Outbreak Map", desc: "Live heatmap across 195+ countries. Color-coded by risk level, critical to minimal. Drill down to country level detail with a single click." },
            { icon: "📊", title: "Statistical Deep Dive", desc: "Historical trend lines, continent comparisons, case fatality rates, and recovery trajectories." },
            { icon: "⚡", title: "AI Risk Scoring", desc: "Every country receives a 0-100 risk score computed from case density, mortality rate, and active case trajectory." },
            { icon: "🔄", title: "Multi-Disease Tracking", desc: "Switch between COVID-19, Tuberculosis, Influenza and more." },
            { icon: "🌐", title: "Country Detail View", desc: "Select any country for a full breakdown: total cases, deaths, recovery rate, risk tier, and population-adjusted metrics." },
            { icon: "🔐", title: "Secure Authentication", desc: "Google Sign-In powered by Firebase. Your session is secure and your data is private." },
          ].map(({ icon, title, desc }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 O.R.B.I.T. | Outbreak Reporting & Biological Intelligence Tracker</p>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="/auth">Sign In</a>
        </div>
      </footer>
    </div>
  );
}
