import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { calculateProjectile } from "./physics/projectile";
import "./App.css";

function App() {
  const [velocity, setVelocity] = useState("30");
  const [angle, setAngle] = useState("45");
  const [height, setHeight] = useState("0");
  const [gravity, setGravity] = useState("9.81");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleCalculate(event) {
    event.preventDefault();

    try {
      const calculation = calculateProjectile({
        velocity: Number(velocity),
        angle: Number(angle),
        height: Number(height),
        gravity: Number(gravity),
      });

      setResult(calculation);
      setError("");
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  }

  return (
    <main className="app">
      <header className="header">
        <h1>Parabola</h1>
        <p>Simulador de Lançamento de Projéteis</p>
      </header>

      <section className="calculator">
        <form onSubmit={handleCalculate}>
          <InputField
            id="velocity"
            label="Velocidade inicial"
            value={velocity}
            onChange={setVelocity}
            unit="m/s"
            min="0"
          />

          <InputField
            id="angle"
            label="Ângulo de lançamento"
            value={angle}
            onChange={setAngle}
            unit="°"
            min="0"
            max="90"
          />

          {/*<InputField
            id="height"
            label="Altura inicial"
            value={height}
            onChange={setHeight}
            unit="m"
            min="0"
          />*/}

          <InputField
            id="gravity"
            label="Gravidade"
            value={gravity}
            onChange={setGravity}
            unit="m/s²"
            min="0.01"
          />

          <button type="submit">
            Calcular trajetória
          </button>
        </form>

        {error && <div className="error">{error}</div>}
      </section>

      {result && (
        <>
          <section className="results">
            <h2>Resultados</h2>

            <div className="result-grid">
              <ResultCard
                title="Tempo de voo"
                value={result.flightTime}
                unit="s"
              />

              <ResultCard
                title="Alcance horizontal"
                value={result.range}
                unit="m"
              />

              <ResultCard
                title="Altura máxima"
                value={result.maxHeight}
                unit="m"
              />

              <ResultCard
                title="Velocidade horizontal"
                value={result.velocityX}
                unit="m/s"
              />

              <ResultCard
                title="Velocidade vertical"
                value={result.velocityY}
                unit="m/s"
              />

              <ResultCard
                title="Velocidade de impacto"
                value={result.impactVelocity}
                unit="m/s"
              />
            </div>
          </section>

          <section className="chart-section">
            <h2>Trajetória</h2>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={450}>
                <LineChart data={result.trajectory}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="x"
                    type="number"
                    label={{
                      value: "Distância (m)",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />

                  <YAxis
                    type="number"
                    label={{
                      value: "Altura (m)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${Number(value).toFixed(2)} m`,
                    ]}
                  />

                  <Line
                    type="monotone"
                    dataKey="y"
                    dot={false}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  unit,
  min,
  max,
}) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <div className="input-unit">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step="any"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        />

        <span>{unit}</span>
      </div>
    </div>
  );
}

function ResultCard({ title, value, unit }) {
  return (
    <article className="result-card">
      <span>{title}</span>

      <strong>
        {value.toFixed(2)}
        <small>{unit}</small>
      </strong>
    </article>
  );
}

export default App;