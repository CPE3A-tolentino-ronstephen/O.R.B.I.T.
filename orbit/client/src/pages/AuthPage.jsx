import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { user, signInWithGoogle, loading, error } = useAuth();
  const navigate = useNavigate();
  const [signing, setSigning] = useState(false);
  const [localErr, setLocalErr] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleGoogle = async () => {
    setSigning(true);
    setLocalErr("");
    try {
      await signInWithGoogle(() => navigate("/dashboard", { replace: true }));
    } catch (e) {
      setLocalErr(e.message || "Sign in failed. Please try again.");
    } finally {
      setSigning(false);
    }
  };

  if (loading) return null;

  const displayErr = localErr || error;

  return (
    <div className="auth-page page-enter">
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 480px;
          background: var(--white);
        }
 
        .auth-panel-left {
          background: var(--gray-900);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .auth-panel-left::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(16,185,129,.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(16,185,129,.08) 0%, transparent 50%);
        }
        .auth-panel-left-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(16,185,129,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,.07) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .auth-brand {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .auth-logo {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, var(--orbit-green), var(--orbit-green-dim));
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 24px rgba(16,185,129,.4);
        }
        .auth-brand-text strong {
          display: block;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 800;
          color: white;
          letter-spacing: 1px;
        }
        .auth-brand-text span {
          font-size: 11px;
          color: rgba(255,255,255,.4);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 1.6px;
        }
        .auth-hero-text {
          position: relative;
          z-index: 1;
        }
        .auth-hero-text h2 {
          font-size: 40px;
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -1px;
        }
        .auth-hero-text h2 em {
          font-style: normal;
          color: var(--orbit-green-light);
        }
        .auth-hero-text p {
          color: rgba(255,255,255,.55);
          font-size: 15px;
          line-height: 1.7;
          max-width: 380px;
        }
        .auth-stats {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 32px;
        }
        .auth-stat {
          border-left: 2px solid rgba(16,185,129,.4);
          padding-left: 14px;
        }
        .auth-stat-num {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: var(--orbit-green-light);
          display: block;
        }
        .auth-stat-label {
          font-size: 11px;
          color: rgba(255,255,255,.4);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 1.3px;
        }
 
        .auth-panel-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 48px 40px;
          border-left: 1px solid var(--border);
        }
        .auth-form-header {
          margin-bottom: 40px;
        }
        .auth-form-header h3 {
          font-size: 28px;
          font-weight: 800;
          color: var(--gray-900);
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .auth-form-header p {
          color: var(--gray-500);
          font-size: 14px;
        }
        .google-btn {
          width: 100%;
          padding: 14px 24px;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          color: var(--gray-700);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .google-btn:hover:not(:disabled) {
          border-color: var(--orbit-green);
          color: var(--orbit-green-dim);
          box-shadow: 0 4px 16px rgba(16,185,129,.12);
          transform: translateY(-1px);
        }
        .google-btn:disabled { opacity: .6; cursor: not-allowed; }
        .google-icon {
          width: 22px; height: 22px;
          flex-shrink: 0;
        }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          color: var(--gray-300);
          font-size: 13px;
        }
        .auth-divider::before, .auth-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .auth-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .auth-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--gray-600);
        }
        .auth-feature-icon {
          width: 28px; height: 28px;
          background: var(--orbit-green-bg);
          border: 1px solid var(--border-em);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }
        .auth-error {
          background: #fee2e2;
          border: 1px solid #fca5a5;
          color: var(--risk-critical);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 14px;
          margin-bottom: 16px;
        }
        .auth-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--gray-400);
          font-size: 14px;
          text-decoration: none;
          margin-top: 32px;
          transition: color 0.15s;
        }
        .auth-back:hover { color: var(--orbit-green); }
 
        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-panel-left { display: none; }
          .auth-panel-right { padding: 40px 24px; }
        }
      `}</style>

      {/* Left panel */}
      <div className="auth-panel-left">
        <div className="auth-panel-left-grid" />

        <div className="auth-brand">
          <div className="auth-logo">🛰</div>
          <div className="auth-brand-text">
            <strong>O.R.B.I.T.</strong>
            <span>THE PULSE OF WORLD HEALTH AT YOUR FINGERTIPS</span>
          </div>
        </div>

        <div className="auth-hero-text">
          <h2>TRACK OUTBREAKS.<br /><em>SAVE LIVES.</em></h2>
          <p>
            Global disease intelligence. Monitor outbreaks, analyze trends,
            and stay ahead of biological threats. All in one platform.
          </p>
        </div>

        <div className="auth-stats">
          {[
            { num: "195+", label: "Countries" },
            { num: "24/7", label: "Live Feed" },
            { num: "100%", label: "Open Data Accuracy" },
          ].map(({ num, label }) => (
            <div className="auth-stat" key={label}>
              <span className="auth-stat-num">{num}</span>
              <span className="auth-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-panel-right">
        <div className="auth-form-header">
          <h3>Sign in to O.R.B.I.T.</h3>
          <p>Access your global health surveillance dashboard</p>
        </div>

        {displayErr && (
          <div className="auth-error">⚠ {displayErr}</div>
        )}

        <button
          className="google-btn"
          onClick={handleGoogle}
          disabled={signing}
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {signing ? "Signing in..." : "Continue with Google"}
        </button>

        <div className="auth-divider">Access includes</div>

        <div className="auth-features">
          {[
            { icon: "🗺", text: "Interactive global outbreak heatmap" },
            { icon: "📊", text: "Country statistics & historical trends" },
            { icon: "⚡", text: "Real-time risk scoring for all nations" },
            { icon: "🔄", text: "Multi-disease tracking" },
          ].map(({ icon, text }) => (
            <div className="auth-feature" key={text}>
              <div className="auth-feature-icon">{icon}</div>
              {text}
            </div>
          ))}
        </div>

        <a href="/" className="auth-back">← Back to home</a>
      </div>
    </div>
  );
}
