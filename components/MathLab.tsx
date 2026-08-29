"use client";

import { useMemo, useState, type ReactNode } from "react";

const TABS = [
  { id: "house", label: "House price" },
  { id: "cancer", label: "Cancer flag" },
  { id: "fraud", label: "Fraud" },
  { id: "credit", label: "Credit card" },
  { id: "drive", label: "Self-driving" },
] as const;

export default function MathLab() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("house");

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`px-3 py-2 rounded-lg text-sm ${
              tab === item.id
                ? "bg-math-purple text-white"
                : "bg-grove-panel text-slate-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tab === "house" && <HouseSim />}
      {tab === "cancer" && <CancerSim />}
      {tab === "fraud" && <FraudSim />}
      {tab === "credit" && <CreditSim />}
      {tab === "drive" && <DriveSim />}
    </div>
  );
}

function HarmonyNote({ text }: { text: string }) {
  return (
    <p className="text-xs text-slate-500 mt-4 border-t border-grove-border pt-3">
      {text}
    </p>
  );
}

function HouseSim() {
  const [sqft, setSqft] = useState(1600);
  const [beds, setBeds] = useState(3);
  const [wSqft, setWSqft] = useState(120);
  const [wBeds, setWBeds] = useState(15000);
  const [bias, setBias] = useState(40000);
  const price = wSqft * sqft + wBeds * beds + bias;

  return (
    <Panel title="Predict a house price">
      <p className="text-sm text-slate-400 mb-4">
        Linear algebra: price = w · x + b. The features are a vector. The
        weights are a vector. The dot product is the prediction.
      </p>
      <Slider label="Square feet" value={sqft} min={600} max={4000} onChange={setSqft} />
      <Slider label="Bedrooms" value={beds} min={1} max={6} onChange={setBeds} />
      <Slider label="Weight on sqft" value={wSqft} min={40} max={300} onChange={setWSqft} />
      <Slider label="Weight on beds" value={wBeds} min={0} max={40000} step={500} onChange={setWBeds} />
      <p className="text-sciml-green font-semibold mt-3">
        Predicted price: ${Math.round(price).toLocaleString()}
      </p>
      <HarmonyNote text="Calculus comes in when we train: we take the derivative of error vs each weight and walk downhill (gradient descent), same idea as Lesson 3 weights." />
    </Panel>
  );
}

function CancerSim() {
  const [size, setSize] = useState(12);
  const [texture, setTexture] = useState(4);
  const score = 0.4 * size + 0.9 * texture - 8;
  const risk = 1 / (1 + Math.exp(-score));

  return (
    <Panel title="Flag a possible tumor">
      <p className="text-sm text-slate-400 mb-4">
        Matrix of cell measurements times a weight vector. Calculus turns the
        score into a probability with a sigmoid: 1 / (1 + e^{-z}).
      </p>
      <Slider label="Size (mm)" value={size} min={2} max={30} onChange={setSize} />
      <Slider label="Texture irregularity" value={texture} min={0} max={10} onChange={setTexture} />
      <p className="text-white mt-3">Score z = {score.toFixed(2)}</p>
      <p className={risk > 0.5 ? "text-red-400 font-semibold" : "text-sciml-green font-semibold"}>
        P(malignant) = {(risk * 100).toFixed(1)}% · {risk > 0.5 ? "Flag for review" : "Likely benign"}
      </p>
      <HarmonyNote text="Same classifier math as Apple or Orange, with a smooth calculus curve so the answer is a probability, not just a winner." />
    </Panel>
  );
}

function FraudSim() {
  const [amount, setAmount] = useState(240);
  const [abroad, setAbroad] = useState(0);
  const [hour, setHour] = useState(14);
  const z = 0.01 * amount + 3.2 * abroad + 0.08 * Math.abs(hour - 14) - 4;
  const p = 1 / (1 + Math.exp(-z));

  return (
    <Panel title="Classify a transaction">
      <p className="text-sm text-slate-400 mb-4">
        Features become a row in a matrix. Weights are learned columns. The
        decision is a threshold on a calculus-smoothed score.
      </p>
      <Slider label="Amount $" value={amount} min={5} max={2000} onChange={setAmount} />
      <Slider label="Abroad (0/1)" value={abroad} min={0} max={1} onChange={setAbroad} />
      <Slider label="Hour of day" value={hour} min={0} max={23} onChange={setHour} />
      <p className={p > 0.5 ? "text-red-400 font-semibold mt-3" : "text-sciml-green font-semibold mt-3"}>
        Fraud score {(p * 100).toFixed(1)}% · {p > 0.5 ? "Block / review" : "Allow"}
      </p>
      <HarmonyNote text="Linear algebra scores the event. Calculus (sigmoid) makes the score a probability so the bank can set a cutoff." />
    </Panel>
  );
}

function CreditSim() {
  const [income, setIncome] = useState(62000);
  const [debt, setDebt] = useState(18000);
  const [late, setLate] = useState(1);
  const z = 0.00004 * income - 0.00009 * debt - 0.8 * late + 1.2;
  const p = 1 / (1 + Math.exp(-z));

  return (
    <Panel title="Decide a credit card application">
      <p className="text-sm text-slate-400 mb-4">
        Approve if w · [income, debt, late payments] is high enough. Training
        uses derivatives of log-loss to move the weights.
      </p>
      <Slider label="Income" value={income} min={15000} max={180000} step={1000} onChange={setIncome} />
      <Slider label="Existing debt" value={debt} min={0} max={80000} step={500} onChange={setDebt} />
      <Slider label="Late payments" value={late} min={0} max={8} onChange={setLate} />
      <p className={p > 0.5 ? "text-sciml-green font-semibold mt-3" : "text-red-400 font-semibold mt-3"}>
        Approve chance {(p * 100).toFixed(1)}% · {p > 0.5 ? "Approve" : "Decline / more docs"}
      </p>
      <HarmonyNote text="This is not a bank policy. It is a toy to show the same matrix + calculus loop used in underwriting models." />
    </Panel>
  );
}

function DriveSim() {
  const [offset, setOffset] = useState(1.2);
  const [speed, setSpeed] = useState(12);
  const [kp, setKp] = useState(0.6);
  const [kd, setKd] = useState(0.25);
  const path = useMemo(() => {
    const points = [offset];
    let x = offset;
    let v = 0;
    for (let i = 0; i < 24; i += 1) {
      const error = 0 - x;
      const steer = kp * error - kd * v;
      v += steer * 0.2;
      x += (v * speed) / 40;
      points.push(x);
    }
    return points;
  }, [offset, speed, kp, kd]);

  return (
    <Panel title="Keep a car in the lane">
      <p className="text-sm text-slate-400 mb-4">
        Camera pixels are a matrix (Lesson 1). The lane offset is a number.
        Calculus: steering uses the error and how fast the error is changing
        (a derivative). Linear algebra combines those terms: steer = Kp*e + Kd*de/dt.
      </p>
      <Slider label="Start offset" value={offset} min={-3} max={3} step={0.1} onChange={setOffset} />
      <Slider label="Speed" value={speed} min={4} max={24} onChange={setSpeed} />
      <Slider label="Kp (position)" value={kp} min={0.1} max={1.4} step={0.05} onChange={setKp} />
      <Slider label="Kd (rate of change)" value={kd} min={0} max={0.8} step={0.05} onChange={setKd} />
      <div className="h-24 bg-grove-dark rounded-lg relative mt-3 overflow-hidden">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-600" />
        {path.map((x, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 rounded-full bg-code-cyan"
            style={{
              left: `${50 + x * 10}%`,
              top: `${(i / path.length) * 90 + 4}%`,
            }}
          />
        ))}
      </div>
      <HarmonyNote text="Pixels (matrix) detect the lane. Calculus measures how the error is changing. Linear algebra mixes those signals into one steering command." />
    </Panel>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-grove-panel border border-grove-border rounded-xl p-5">
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm text-slate-400 mb-2">
      {label}: {value}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </label>
  );
}
