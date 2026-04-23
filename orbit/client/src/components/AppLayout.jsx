import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <style>{`
        .app-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: transparent;
        }
        .main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
          background: transparent;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          background: transparent;
        }
        @media (max-width: 768px) {
          .main-content { 
            padding: 16px; 
          }
        }
      `}</style>

      <Sidebar collapsed={collapsed} />

      <div className="main-area">
        <Header onToggleSidebar={() => setCollapsed(c => !c)} />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
