import React, { useState } from 'react';
import axios from 'axios';

export default function Predictor() {
  const [inputs, setInputs] = useState({
    schooling: 12.0,
    income_composition: 0.65,
    hiv_aids: 0.1,
    gdp: 5000.0
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/predict', inputs);
      setPrediction(response.data.predicted_life_expectancy);
    } catch (err) {
      setError('Could not connect to the machine learning backend engine. Check your terminal execution!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', fontFamily: 'system-ui, sans-serif', color: '#333' }}>
      
      {/* 📊 ROW 1: ANALYTICS & VISUALIZATION EMBED SUMMARY */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
        <h3>🌎 Interactive Global Health Insights (Tableau Integration)</h3>
        <p style={{ fontSize: '0.95rem', color: '#666' }}>
          This interface combines static historical data tracking with an active machine learning simulation. 
          Use the map and trend visualizers below to analyze continental distributions, then use the predictive simulator to test policy targets.
        </p>
        
        {/* Placeholder Frame for Tableau Map Embed */}
        <div style={{ width: '100%', height: '400px', backgroundColor: '#e9ecef', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ced4da', margin: '1rem 0' }}>
          <p style={{ color: '#6c757d', fontWeight: '500', textAlign: 'center' }}>
            📍 [INSERT TABLEAU CHOROPLETH EMBED HERE]<br />
            <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>(Paste your CSIS-3860 global risk assignment map code/iframe inside this layout section)</span>
          </p>
        </div>
      </div>

      {/* 🛠️ ROW 2: CONTROLS & SIMULATION GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: THE ML SIMULATOR FORM */}
        <div style={{ border: '1px solid #dee2e6', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>🔮 Scenario Planner Simulator</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
            Adjust the slider settings to build a hypothetical country matrix profile and generate live expectancy forecasts.
          </p>

          <form onSubmit={handleSubmit}>
            {/* INPUT 1 */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Schooling (Years)</label>
                <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 'bold' }}>{inputs.schooling} yrs</span>
              </div>
              <input type="range" min="1" max="22" step="0.1" name="schooling" value={inputs.schooling} onChange={handleChange} style={{ width: '100%', margin: '0.5rem 0' }} />
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                💡 Total average number of institutional school years citizens receive.
              </div>
            </div>

            {/* INPUT 2 */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Income Composition (0 to 1)</label>
                <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 'bold' }}>{inputs.income_composition}</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" name="income_composition" value={inputs.income_composition} onChange={handleChange} style={{ width: '100%', margin: '0.5rem 0' }} />
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                💡 Human Development Index (HDI) score measuring resource allocation efficiency. Higher = better distribution.
              </div>
            </div>

            {/* INPUT 3 */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>HIV/AIDS Prevalence Rate (%)</label>
                <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 'bold' }}>{inputs.hiv_aids}%</span>
              </div>
              <input type="range" min="0.1" max="50" step="0.1" name="hiv_aids" value={inputs.hiv_aids} onChange={handleChange} style={{ width: '100%', margin: '0.5rem 0' }} />
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                💡 Active clinical prevalence rate per 1,000 births for ages 0-4.
              </div>
            </div>

            {/* INPUT 4 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>GDP per Capita ($)</label>
                <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 'bold' }}>${inputs.gdp.toLocaleString()}</span>
              </div>
              <input type="range" min="100" max="120000" step="100" name="gdp" value={inputs.gdp} onChange={handleChange} style={{ width: '100%', margin: '0.5rem 0' }} />
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic' }}>
                💡 Gross Domestic Product per person, adjusted for domestic currency buying power.
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem' }}>
              {loading ? 'Processing Model Metrics...' : 'Compute Dynamic Prediction'}
            </button>
          </form>

          {/* DISPLAY DYNAMIC ML OUTPUT */}
          {prediction !== null && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', textAlign: 'center' }}>
              <h4 style={{ margin: 0, color: '#166534', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Computed Life Expectancy</h4>
              <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0.5rem 0', color: '#15803d' }}>{prediction} <span style={{ fontSize: '1.2rem', fontWeight: 'normal' }}>Years</span></p>
            </div>
          )}

          {error && <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '6px', color: '#991b1b', fontSize: '0.85rem' }}>⚠️ {error}</div>}
        </div>

        {/* RIGHT COLUMN: USER INTERPRETATION & FIELD GUIDE MAP */}
        <div style={{ border: '1px solid #dee2e6', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>📖 Indicator Field Guide & Benchmarks</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Unsure what values to plug in? Use these real-world baseline metrics to guide your model evaluations:
          </p>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem 0' }}>Profile Archetype</th>
                <th>Schooling</th>
                <th>Income Comp.</th>
                <th>GDP per Capita</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem 0', fontWeight: '600' }}>Developed Nations (e.g., Canada)</td>
                <td>16 - 19 yrs</td>
                <td>0.85 - 0.95</td>
                <td>$45,000+</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem 0', fontWeight: '600' }}>Developing Markets</td>
                <td>11 - 14 yrs</td>
                <td>0.60 - 0.75</td>
                <td>$5,000 - $12,000</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 0', fontWeight: '600' }}>Underdeveloped Systems</td>
                <td>4 - 8 yrs</td>
                <td>0.30 - 0.45</td>
                <td>Under $1,500</td>
              </tr>
            </tbody>
          </table>

          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '1rem', borderRadius: '6px', marginTop: '1.5rem', fontSize: '0.85rem', color: '#1e40af' }}>
            <strong>💡 Analytical Insight:</strong> Note how variations in **Income Composition** can drastically sway the predictive outcome even if a country's **GDP** remains stagnant. This highlights the importance of resource management over raw economic scale!
          </div>
        </div>

      </div>
    </div>
  );
}