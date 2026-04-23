import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { to: "/dashboard", icon: "⬡", label: "Dashboard" },
  { to: "/map", icon: "◈", label: "Live Map" },
  { to: "/statistics", icon: "▦", label: "Statistics" },
];

export default function Sidebar({ collapsed, mobileOpen, setMobileOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* BACKDROP (click outside to close) */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "open" : ""}`}>
        <style>{`
          .sidebar {
            width: var(--sidebar-w);
            min-width: var(--sidebar-w);
            background: var(--white);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            transition: width .25s ease, min-width .25s ease;
            z-index: 100;
            overflow: hidden;
          }

          .sidebar.collapsed { 
            width: 68px; 
            min-width: 68px; 
          }

          .sidebar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
          }

          .sidebar.collapsed .sidebar-brand {
            justify-content: center;
          }

          .orbit-logo {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--orbit-green), var(--orbit-green-dim));
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(16,185,129,.35);
          }

          .orbit-logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .orbit-wordmark strong {
            display: block;
            font-family: var(--font-display);
            font-size: 16px;
            font-weight: 800;
            color: var(--gray-900);
            letter-spacing: .05em;
          }

          .orbit-wordmark span {
            font-size: 10px;
            color: var(--gray-400);
            font-family: var(--font-mono);
            text-transform: uppercase;
          }

          .sidebar-nav {
            flex: 1;
            padding: 16px 12px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            overflow-y: auto;
          }

          .nav-link {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 11px 14px;
            border-radius: var(--radius-sm);
            color: var(--gray-600);
            text-decoration: none;
            font-size: 14px;
            transition: all .18s ease;
          }

          .nav-link:hover { 
            background: var(--orbit-green-bg); 
            color: var(--orbit-green-dim); 
          }

          .nav-link.active { 
            background: var(--orbit-green-bg); 
            color: var(--orbit-green-dim); 
            font-weight: 600; 
          }

          .nav-icon {
            width: 32px; 
            height: 32px;
            border-radius: 7px;
            background: var(--gray-100);
            display: flex; 
            align-items: center; 
            justify-content: center;
          }

          .sidebar-footer {
            padding: 14px 12px;
            border-top: 1px solid var(--border);
          }

          .user-chip {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .user-avatar {
            width: 34px; 
            height: 34px;
            border-radius: 50%;
            background: var(--orbit-green-bg);
            display: flex; 
            align-items: center; 
            justify-content: center;
          }

          .logout-btn {
            width: 100%; 
            margin-top: 8px; 
            padding: 8px;
            background: none; 
            border: none; 
            border-radius: var(--radius-sm);
            cursor: pointer;
          }

          /* ===== MOBILE ===== */
          @media (max-width: 768px) {
            .sidebar {
              position: fixed;
              top: 0;
              left: 0;
              height: 100vh;
              width: 260px;
              transform: translateX(-100%);
              transition: transform 0.25s ease;
              box-shadow: 0 0 40px rgba(0,0,0,0.15);
              z-index: 200;
            }

            .sidebar.open {
              transform: translateX(0);
            }

            .sidebar-backdrop {
              position: fixed;
              inset: 0;
              background: rgba(0,0,0,0.3);
              z-index: 150;
            }
          }
        `}</style>

        <NavLink to="/dashboard" className="sidebar-brand" onClick={handleNavClick}>
          <div className="orbit-logo">
            <img src="/logo.png" alt="O.R.B.I.T. Logo" />
          </div>

          {!collapsed && (
            <div className="orbit-wordmark">
              <strong>O.R.B.I.T.</strong>
              <span>Disease Tracker</span>
            </div>
          )}
        </NavLink>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} className="nav-link" onClick={handleNavClick}>
              <span className="nav-icon">{icon}</span>
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            {user?.photoURL
              ? <img src={user.photoURL} alt="avatar" className="user-avatar" />
              : <div className="user-avatar">👤</div>
            }
            {!collapsed && (
              <div>
                <div>{user?.name || "Researcher"}</div>
                <div>{user?.email}</div>
              </div>
            )}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            ⏻ {!collapsed && "Sign Out"}
          </button>
        </div>
      </aside>
    </>
  );
}