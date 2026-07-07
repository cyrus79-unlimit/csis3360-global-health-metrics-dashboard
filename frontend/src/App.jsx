import React from "react";
import Predictor from "./components/Predictor.jsx";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#1e293b",
        paddingBottom: "4rem",
      }}
    >
      {/* 🌐 TOP APPLICATION NAVIGATION HEADER */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.5rem" }}>🩺</span>
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.1rem",
              letterSpacing: "-0.025em",
              color: "#0f172a",
            }}
          >
            PulseMetrics{" "}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#64748b",
          }}
        >
          <span
            style={{
              color: "#3b82f6",
              borderBottom: "2px solid #3b82f6",
              paddingBottom: "0.25rem",
              cursor: "pointer",
            }}
          >
            Global Dashboard
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            Documentation
          </span>
        </div>
      </header>

      {/* 🚀 ONBOARDING HERO BANNER */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "3.5rem 2rem",
          textAlign: "center",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
          <span
            style={{
              backgroundColor: "#38bdf8",
              color: "#0f172a",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Interactive Health Policy Sandbox
          </span>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              marginTop: "1rem",
              marginBottom: "0.75rem",
              letterSpacing: "-0.05em",
            }}
          >
            Global Health Metrics & Longevity Planner
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#94a3b8",
              lineHeight: "1.6",
              fontWeight: "400",
            }}
          >
            How do structural socioeconomic investments translate into raw human
            lifespan? Explore geographic historical trends inside our map below,
            then proceed to the simulator to project policy targets using
            machine learning.
          </p>
        </div>
      </section>

      {/* COMPONENT ELEMENT LAYOUT LAYERS */}
      <main
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}
      >
        {/* 🗺️ STEP 1: GLOBAL TABLEAU HISTORICAL ANALYSIS PANEL */}
        <section
          style={{
            backgroundColor: "#ffffff",
            padding: "2.5rem",
            borderRadius: "16px",
            boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.03)",
            marginBottom: "3rem",
            border: "1px solid #e2e8f0",
            borderTop: "4px solid #3b82f6",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: "700",
              }}
            >
              SPATIAL VISUALIZER
            </span>
            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: "800",
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Global Historical Analysis
            </h2>
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#64748b",
              marginTop: 0,
              marginBottom: "2rem",
            }}
          >
            Interact with the geospatial canvas layers below to drill down into
            historical country distributions.
          </p>

          <div
            style={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
            }}
          >
            <iframe
              src="https://public.tableau.com/shared/QM5DQ237N?:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true"
              title="Global Health Metrics Mapping Visualizer"
              style={{ width: "100%", height: "560px", border: "none" }}
            />
          </div>
        </section>

        {/* ⚡ STEP 2 & 3: RENDERS PREDICTOR.JSX COMPONENT IN THE RUNTIME VIEW */}
        <Predictor />
      </main>

      {/* FOOTER METRIC INFO */}
      <footer
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "0.8rem",
          borderTop: "1px solid #e2e8f0",
          padding: "2rem 0",
          marginTop: "5rem",
          backgroundColor: "#ffffff",
        }}
      >
        PulseMetrics Portal • Developed via FastAPI Backend Engine & React
        Interface Ecosystem • 2026
      </footer>
    </div>
  );
}
