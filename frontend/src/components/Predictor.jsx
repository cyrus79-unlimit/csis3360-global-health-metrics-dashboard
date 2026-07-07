import React, { useState } from "react";
import axios from "axios";

export default function Predictor() {
  const [inputs, setInputs] = useState({
    schooling: 12.0,
    income_composition: 0.65,
    hiv_aids: 0.1,
    gdp: 5000.0,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: parseFloat(value) || 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict",
        inputs,
      );
      setPrediction(response.data.predicted_life_expectancy);
    } catch (err) {
      console.error(err);
      setError(
        "Could not establish connection with the backend. Ensure your FastAPI server is still running!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
        gap: "2.5rem",
        alignItems: "start",
        marginTop: "2rem",
      }}
    >
      {/* 🔮 PANEL 1: CONTROL CONSOLE */}
      <section
        style={{
          backgroundColor: "#ffffff",
          padding: "2.25rem",
          borderRadius: "16px",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              backgroundColor: "#fef3c7",
              color: "#d97706",
              padding: "0.25rem 0.75rem",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontWeight: "700",
            }}
          >
            CONTROL CONSOLE
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
            Policy Simulator
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* INPUT 1: EDUCATION */}
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #2563eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <label
                style={{
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "#475569",
                  letterSpacing: "0.05em",
                }}
              >
                Schooling Duration
              </label>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#2563eb",
                  fontWeight: "700",
                  backgroundColor: "#eff6ff",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "6px",
                }}
              >
                {inputs.schooling} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="22"
              step="0.1"
              name="schooling"
              value={inputs.schooling}
              onChange={handleChange}
              style={{
                width: "100%",
                accentColor: "#2563eb",
                cursor: "pointer",
              }}
            />
          </div>

          {/* INPUT 2: INCOME COMPOSITION */}
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #10b981",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <label
                style={{
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "#475569",
                  letterSpacing: "0.05em",
                }}
              >
                Income Distribution (HDI)
              </label>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#10b981",
                  fontWeight: "700",
                  backgroundColor: "#ecfdf5",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "6px",
                }}
              >
                {inputs.income_composition}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              name="income_composition"
              value={inputs.income_composition}
              onChange={handleChange}
              style={{
                width: "100%",
                accentColor: "#10b981",
                cursor: "pointer",
              }}
            />
          </div>

          {/* INPUT 3: HIV/AIDS */}
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #ef4444",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <label
                style={{
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "#475569",
                  letterSpacing: "0.05em",
                }}
              >
                HIV/AIDS Prevalence
              </label>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#ef4444",
                  fontWeight: "700",
                  backgroundColor: "#fef2f2",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "6px",
                }}
              >
                {inputs.hiv_aids}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="50"
              step="0.1"
              name="hiv_aids"
              value={inputs.hiv_aids}
              onChange={handleChange}
              style={{
                width: "100%",
                accentColor: "#ef4444",
                cursor: "pointer",
              }}
            />
          </div>

          {/* INPUT 4: GDP */}
          <div
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              borderLeft: "4px solid #64748b",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <label
                style={{
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "#475569",
                  letterSpacing: "0.05em",
                }}
              >
                GDP per Capita
              </label>
              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  fontWeight: "700",
                  backgroundColor: "#f1f5f9",
                  padding: "0.15rem 0.6rem",
                  borderRadius: "6px",
                }}
              >
                ${inputs.gdp.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="120000"
              step="100"
              name="gdp"
              value={inputs.gdp}
              onChange={handleChange}
              style={{
                width: "100%",
                accentColor: "#64748b",
                cursor: "pointer",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "1rem",
              transition: "all 0.2s",
              boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.3)",
            }}
          >
            {loading
              ? "Crunching Matrix Parameters..."
              : "⚡ Generate ML Lifespan Projection"}
          </button>
        </form>

        {/* RESULT INSIDE SYSTEM */}
        {prediction !== null && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
              border: "1px solid #86efac",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 4px 12px 0 rgba(22, 163, 74, 0.08)",
            }}
          >
            <h4
              style={{
                margin: 0,
                color: "#14532d",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: "700",
              }}
            >
              Calculated Lifespan Forecast
            </h4>
            <p
              style={{
                fontSize: "3.25rem",
                fontWeight: "900",
                margin: "0.25rem 0",
                color: "#166534",
                letterSpacing: "-0.04em",
              }}
            >
              {prediction}{" "}
              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Yrs</span>
            </p>
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#fef2f2",
              border: "1px solid #fee2e2",
              borderRadius: "8px",
              color: "#991b1b",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            ⚠️ {error}
          </div>
        )}
      </section>

      {/* 📊 PANEL 2: INFORMATION BENCHMARKS */}
      <section
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2.25rem",
            borderRadius: "16px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                backgroundColor: "#f1f5f9",
                color: "#475569",
                padding: "0.25rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: "700",
              }}
            >
              LIBRARY
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
              Benchmark Records
            </h2>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              {
                title: "Developed Nations",
                school: "16-19 yrs",
                composition: "0.85 - 0.95",
                gdp: "$45,000+",
                color: "#2563eb",
                bg: "#eff6ff",
              },
              {
                title: "Developing Markets",
                school: "11-14 yrs",
                composition: "0.60 - 0.75",
                gdp: "$8,500",
                color: "#10b981",
                bg: "#ecfdf5",
              },
              {
                title: "Emerging Systems",
                school: "4-8 yrs",
                composition: "0.30 - 0.45",
                gdp: "< $1,500",
                color: "#ef4444",
                bg: "#fef2f2",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: "0.25rem 0 0 0",
                      fontSize: "0.8rem",
                      color: "#64748b",
                    }}
                  >
                    Schooling: <strong>{item.school}</strong> • HDI:{" "}
                    <strong>{item.composition}</strong>
                  </p>
                </div>
                <span
                  style={{
                    color: item.color,
                    backgroundColor: item.bg,
                    padding: "0.35rem 0.75rem",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                  }}
                >
                  {item.gdp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* INSIGHT CARD */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#ffffff",
            padding: "1.75rem",
            borderRadius: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4
            style={{
              margin: "0 0 0.5rem 0",
              color: "#38bdf8",
              fontSize: "1rem",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            💡 Model Insight
          </h4>
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              color: "#94a3b8",
              lineHeight: "1.6",
            }}
          >
            Notice how bumping <strong>Income Distribution</strong> can save
            more lives in the simulation than doubling your{" "}
            <strong>GDP per Capita</strong>? Structural policy adjustments often
            balance systemic returns faster than raw wealth metrics.
          </p>
        </div>
      </section>
    </div>
  );
}
