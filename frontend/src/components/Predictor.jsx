import React, { useState } from 'react';
import axios from 'axios';

export default function Predictor() {
  // Set up state variables to track form inputs
  const [inputs, setInputs] = useState({
    schooling: 12.0,
    income_composition: 0.65,
    hiv_aids: 0.1,
    gdp: 5000.0
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update numbers smoothly as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: parseFloat(value) || 0
    });
  };

  // Ship the input metrics to the FastAPI local server on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Connects directly to your live backend server running on port 8000
      const response = await axios.post('http://127.0.0.1:8000/api/predict', inputs);
      setPrediction(response.data.predicted_life_expectancy);
    } catch (err) {
      console.error(err);
      setError('Could not establish connection with the backend. Ensure your FastAPI server is still running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>🔮 Model Life Expectancy Predictor</h2>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Adjust country statistics below to compute real-time machine learning predictions.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Schooling (Years):</label>
          <input type="number" step="0.1" name="schooling" value={inputs.schooling} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Income Composition of Resources (0 to 1):</label>
          <input type="number" step="0.01" name="income_composition" value={inputs.income_composition} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>HIV/AIDS Prevalence Rate (%):</label>
          <input type="number" step="0.1" name="hiv_aids" value={inputs.hiv_aids} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>GDP per Capita ($):</label>
          <input type="number" step="1" name="gdp" value={inputs.gdp} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Calculating Output...' : 'Run Live Prediction'}
        </button>
      </form>

      {/* Display computed output safely once loaded */}
      {prediction !== null && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eefcff', border: '1px solid #bce6ff', borderRadius: '4px', textAlign: 'center' }}>
          <h3 style={{ margin: 0, color: '#004e7a' }}>Predicted Life Expectancy:</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#0070f3' }}>{prediction} Years</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff0f0', border: '1px solid #ffb6b6', borderRadius: '4px', color: '#ff0000', textAlign: 'center' }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}