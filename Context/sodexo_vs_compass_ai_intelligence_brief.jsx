import { useEffect, useRef } from "react";

const P = "#8E9FD5";
const CO = "#2D8A6B";
const RD = "#E24B4A";
const GRID = "rgba(45,52,54,0.08)";
const TICK = "#9ca3af";

const styles = {
  root: { fontFamily: "'DM Sans', sans-serif", background: "#f7f8fc", color: "#1a1d20", fontSize: 14, lineHeight: 1.6, minHeight: "100vh" },
  topbar: { background: "#2D3436", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 48, position: "sticky", top: 0, zIndex: 100 },
  tbBrand: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: P, letterSpacing: ".08em", textTransform: "uppercase" },
  tbMeta: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: ".05em" },
  tbBadge: { background: P, color: "white", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 3, letterSpacing: ".06em", textTransform: "uppercase" },
  hero: { background: "#2D3436", padding: "3rem 2rem 2.5rem", borderBottom: `3px solid ${P}` },
  heroInner: { maxWidth: 1100, margin: "0 auto" },
  heroEy: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: P, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".75rem", display: "flex", alignItems: "center", gap: 8 },
  heroEyLine: { display: "inline-block", width: 24, height: 2, background: P },
  h1: { fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "white", lineHeight: 1.15, marginBottom: ".5rem" },
  h1span: { color: P },
  heroSub: { fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 620, marginBottom: "1.75rem" },
  pills: { display: "flex", flexWrap: "wrap", gap: 8 },
  pillO: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, padding: "4px 10px", borderRadius: 3, letterSpacing: ".05em", textTransform: "uppercase", border: "1px solid rgba(142,159,213,0.4)", color: P },
  pillS: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, padding: "4px 10px", borderRadius: 3, letterSpacing: ".05em", textTransform: "uppercase", background: "rgba(142,159,213,0.15)", color: P },
  main: { maxWidth: 1100, margin: "0 auto", padding: "2rem" },
  sh: { display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem", paddingBottom: ".6rem", borderBottom: "1px solid rgba(45,52,54,0.10)" },
  sl: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: P },
  st: { fontSize: 15, fontWeight: 600, color: "#1a1d20" },
  sn: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#9ca3af", marginLeft: "auto" },
  kpiStrip: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 10, marginBottom: "2rem" },
  kpi: (accent) => ({ background: "white", border: "1px solid rgba(45,52,54,0.10)", borderRadius: 8, padding: "1rem 1.1rem", position: "relative", overflow: "hidden", borderTop: `3px solid ${accent}` }),
  kl: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: ".08em", color: "#6b7280", marginBottom: 6 },
  kv: { fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#2D3436", lineHeight: 1, marginBottom: 4 },
  kvsup: { fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
  kd: { fontSize: 11, color: "#6b7280" },
  kt: (bg, c) => ({ display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, padding: "2px 6px", borderRadius: 2, marginTop: 5, textTransform: "uppercase", letterSpacing: ".05em", background: bg, color: c }),
  ins: (accent) => ({ background: "white", border: "1px solid rgba(45,52,54,0.10)", borderLeft: `4px solid ${accent}`, borderRadius: "0 8px 8px 0", padding: "1.1rem 1.25rem", marginBottom: "2rem" }),
  insEy: (c) => ({ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: ".1em", color: c, marginBottom: 6 }),
  insTx: { fontSize: 13.5, color: "#2D3436", lineHeight: 1.7 },
  cg2: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16, marginBottom: "2rem" },
  cc: { background: "white", border: "1px solid rgba(45,52,54,0.10)", borderRadius: 10, padding: "1.25rem" },
  ct: { fontSize: 13, fontWeight: 600, color: "#2D3436", marginBottom: 2 },
  cs2: { fontSize: 11, color: "#6b7280", marginBottom: 10, lineHeight: 1.5 },
  lg: { display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 10 },
  le: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#6b7280" },
  lsq: (bg) => ({ width: 10, height: 10, borderRadius: 2, flexShrink: 0, background: bg }),
  lbd: { width: 12, height: 8, borderRadius: 2, background: "rgba(226,75,74,0.08)", border: "1px dashed rgba(226,75,74,0.4)", flexShrink: 0 },
  vg: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16, marginBottom: "2rem" },
  vc: { background: "white", border: "1px solid rgba(45,52,54,0.10)", borderRadius: 10, overflow: "hidden" },
  vh: (bg, bb) => ({ padding: ".9rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: bg, borderBottom: `1px solid ${bb}` }),
  vn: { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2D3436" },
  vbg: (bg) => ({ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, padding: "3px 8px", borderRadius: 3, textTransform: "uppercase", letterSpacing: ".06em", background: bg, color: "white" }),
  vr: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 1.1rem", borderBottom: "1px solid rgba(45,52,54,0.10)", fontSize: 12 },
  vd: { color: "#6b7280" },
  vval: (c) => ({ fontWeight: 500, color: c }),
  vdt: (bg) => ({ display: "inline-block", width: 6, height: 6, borderRadius: "50%", marginRight: 5, flexShrink: 0, background: bg }),
  fc: { background: "white", border: "1px solid rgba(45,52,54,0.10)", borderRadius: 10, padding: "1.25rem", marginBottom: "2rem" },
  qb: { background: "#2D3436", borderRadius: 10, padding: "1.5rem 1.75rem", marginBottom: "2rem", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 16 },
  ql: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: ".1em", color: P, marginBottom: 8 },
  qt: { fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 },
  footer: { background: "#2D3436", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 },
  fb: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: P, letterSpacing: ".08em" },
  fn: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: ".04em" },
};

function RadarChart() {
  const ref = useRef(null);
  const instance = useRef(null);
  useEffect(() => {
    if (!window.Chart) return;
    if (instance.current) instance.current.destroy();
    instance.current = new window.Chart(ref.current, {
      type: "radar",
      data: {
        labels: ["Governance", "Data Infrastructure", "Ops Deployment", "Speed", "Margin Impact", "Leadership Alignment"],
        datasets: [
          { label: "Sodexo", data: [85,78,22,45,38,60], borderColor: P, backgroundColor: "rgba(142,159,213,0.12)", pointBackgroundColor: P, borderWidth: 2, pointRadius: 4 },
          { label: "Compass", data: [48,62,74,80,72,65], borderColor: CO, backgroundColor: "rgba(45,138,107,0.10)", pointBackgroundColor: CO, borderWidth: 2, pointRadius: 4 },
          { label: "Min viable", data: [55,55,55,55,55,55], borderColor: RD, backgroundColor: "transparent", pointBackgroundColor: RD, borderWidth: 1.5, borderDash: [4,4], pointRadius: 3 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { min: 0, max: 100, ticks: { stepSize: 25, backdropColor: "transparent" }, grid: { color: GRID }, angleLines: { color: GRID }, pointLabels: { font: { size: 11 } } } } },
    });
    return () => instance.current?.destroy();
  }, []);
  return <div style={{ height: 270, position: "relative" }}><canvas ref={ref} role="img" aria-label="Radar chart: Sodexo leads governance 85, Compass leads ops deployment 74 and speed 80." /></div>;
}

function LineChart() {
  const ref = useRef(null);
  const instance = useRef(null);
  const bandPlugin = {
    id: "band",
    beforeDraw(c) {
      const { ctx, chartArea, scales } = c;
      const y1 = scales.y.getPixelForValue(55), y2 = scales.y.getPixelForValue(30);
      ctx.save(); ctx.fillStyle = "rgba(226,75,74,0.09)";
      ctx.fillRect(chartArea.left, y1, chartArea.right - chartArea.left, y2 - y1);
      ctx.strokeStyle = "rgba(226,75,74,0.3)"; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
      [y1, y2].forEach(y => { ctx.beginPath(); ctx.moveTo(chartArea.left, y); ctx.lineTo(chartArea.right, y); ctx.stroke(); });
      ctx.restore();
    },
  };
  useEffect(() => {
    if (!window.Chart) return;
    if (instance.current) instance.current.destroy();
    instance.current = new window.Chart(ref.current, {
      type: "line",
      data: {
        labels: ["2021","2022","2023","2024","2025","2026 est."],
        datasets: [
          { label: "Sodexo", data: [5,9,13,17,22,26], borderColor: P, backgroundColor: "rgba(142,159,213,0.07)", fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: P },
          { label: "Compass", data: [10,18,28,38,50,58], borderColor: CO, backgroundColor: "rgba(45,138,107,0.07)", fill: true, tension: 0.4, borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: CO },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y}%` } } }, scales: { x: { grid: { color: GRID }, ticks: { color: TICK } }, y: { min: 0, max: 75, grid: { color: GRID }, ticks: { color: TICK, callback: v => v + "%" } } } },
      plugins: [bandPlugin],
    });
    return () => instance.current?.destroy();
  }, []);
  return <div style={{ height: 270, position: "relative" }}><canvas ref={ref} role="img" aria-label="Line chart: Compass reaches 50% ops AI coverage by 2025; Sodexo trails at 22%." /></div>;
}

function BarChart() {
  const ref = useRef(null);
  const instance = useRef(null);
  const barBand = {
    id: "barband",
    beforeDraw(c) {
      const { ctx, chartArea, scales } = c;
      const y1 = scales.y.getPixelForValue(55), y2 = scales.y.getPixelForValue(35);
      ctx.save(); ctx.fillStyle = "rgba(226,75,74,0.09)";
      ctx.fillRect(chartArea.left, y1, chartArea.right - chartArea.left, y2 - y1);
      ctx.strokeStyle = "rgba(226,75,74,0.35)"; ctx.lineWidth = 1; ctx.setLineDash([5,4]);
      ctx.beginPath(); ctx.moveTo(chartArea.left, y1); ctx.lineTo(chartArea.right, y1); ctx.stroke();
      ctx.restore();
    },
  };
  useEffect(() => {
    if (!window.Chart) return;
    if (instance.current) instance.current.destroy();
    instance.current = new window.Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Governance\nArchitecture","Data\nInfrastructure","Ops AI\nDeployment","Margin\nImpact","Iteration\nSpeed","Ops-Gov\nBridge"],
        datasets: [
          { label: "Sodexo", data: [85,78,22,38,45,30], backgroundColor: "rgba(142,159,213,0.80)", borderColor: P, borderWidth: 1 },
          { label: "Compass", data: [48,62,74,72,80,58], backgroundColor: "rgba(45,138,107,0.75)", borderColor: CO, borderWidth: 1 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y}/100` } } }, scales: { x: { grid: { color: GRID }, ticks: { color: TICK, maxRotation: 0 } }, y: { min: 0, max: 100, grid: { color: GRID }, ticks: { color: TICK }, title: { display: true, text: "Score (0–100)", color: TICK, font: { size: 10 } } } } },
      plugins: [barBand],
    });
    return () => instance.current?.destroy();
  }, []);
  return <div style={{ height: 290, position: "relative" }}><canvas ref={ref} role="img" aria-label="Bar chart: Compass leads 4 of 6 dimensions. Sodexo leads governance 85 and data infrastructure 78." /></div>;
}

function FaangChart() {
  const ref = useRef(null);
  const instance = useRef(null);
  useEffect(() => {
    if (!window.Chart) return;
    if (instance.current) instance.current.destroy();
    instance.current = new window.Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Real-time\nAdaptation","Feedback Loop\nVelocity","Ops AI\nBreadth","Governance\nMaturity"],
        datasets: [
          { label: "Sodexo", data: [28,35,22,85], backgroundColor: "rgba(142,159,213,0.80)", borderColor: P, borderWidth: 1 },
          { label: "Compass", data: [58,65,74,48], backgroundColor: "rgba(45,138,107,0.75)", borderColor: CO, borderWidth: 1 },
          { label: "Amazon", data: [92,95,88,78], backgroundColor: "rgba(226,75,74,0.75)", borderColor: RD, borderWidth: 1 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y}/100` } } }, scales: { x: { grid: { color: GRID }, ticks: { color: TICK, maxRotation: 0 } }, y: { min: 0, max: 100, grid: { color: GRID }, ticks: { color: TICK }, title: { display: true, text: "Score (0–100)", color: TICK, font: { size: 10 } } } } },
    });
    return () => instance.current?.destroy();
  }, []);
  return <div style={{ height: 240, position: "relative" }}><canvas ref={ref} role="img" aria-label="Bar chart: Amazon scores 92 real-time adaptation vs Sodexo 28 and Compass 58." /></div>;
}

const VRow = ({ dim, val, dot }) => (
  <div style={styles.vr}>
    <span style={styles.vd}>{dim}</span>
    <span style={styles.vval(dot === "green" ? "#1a6644" : dot === "amber" ? "#7a4e08" : "#9b2020")}>
      <span style={styles.vdt(dot === "green" ? CO : dot === "amber" ? "#C0890A" : RD)} />
      {val}
    </span>
  </div>
);

export default function SodexoCompassBrief() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    script.async = true;
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <div style={styles.root}>
      {/* TOPBAR */}
      <nav style={styles.topbar}>
        <span style={styles.tbBrand}>Epoch Frameworks LLC</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={styles.tbMeta}>AI Adoption Architect + EBT v2.6</span>
          <span style={styles.tbBadge}>Confidential</span>
        </div>
      </nav>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroEy}>
            <span style={styles.heroEyLine} />
            Intelligence Brief
          </div>
          <h1 style={styles.h1}>Sodexo vs <span style={styles.h1span}>Compass Group</span><br />AI Adoption Analysis</h1>
          <p style={styles.heroSub}>Pre-call intelligence for Joe Molesky, SVP Sodexo — who owns the gap between governance sophistication and operational deployment, and what it's costing both companies.</p>
          <div style={styles.pills}>
            {["AI Adoption Architect","EBT v2.6","Marketing Ops Catalyst"].map(t => <span key={t} style={styles.pillO}>{t}</span>)}
            <span style={styles.pillS}>April 2026</span>
          </div>
        </div>
      </div>

      <div style={styles.main}>

        {/* KPI STRIP */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={styles.sh}><span style={styles.sl}>01</span><span style={styles.st}>Headline metrics</span><span style={styles.sn}>At a glance</span></div>
        </div>
        <div style={styles.kpiStrip}>
          <div style={styles.kpi(P)}>
            <div style={styles.kl}>Sodexo AI maturity</div>
            <div style={styles.kv}>62<sup style={styles.kvsup}>/100</sup></div>
            <div style={styles.kd}>Governance-strong, operationally lagging</div>
            <span style={styles.kt("#fef3dc","#7a4e08")}>Watch zone</span>
          </div>
          <div style={styles.kpi(CO)}>
            <div style={styles.kl}>Compass AI maturity</div>
            <div style={styles.kv}>74<sup style={styles.kvsup}>/100</sup></div>
            <div style={styles.kd}>Deployment-first, governance-thin</div>
            <span style={styles.kt("#e6f4ee","#1a6644")}>Ahead on ops</span>
          </div>
          <div style={styles.kpi("#C0890A")}>
            <div style={styles.kl}>Compass ops AI coverage</div>
            <div style={styles.kv}>50<sup style={styles.kvsup}>%</sup></div>
            <div style={styles.kd}>Active in half of all operations globally</div>
            <span style={styles.kt("#e6f4ee","#1a6644")}>Margin-positive</span>
          </div>
          <div style={styles.kpi(RD)}>
            <div style={styles.kl}>Sodexo CDIO recognition</div>
            <div style={styles.kv}>#1</div>
            <div style={styles.kd}>Best in Data &amp; AI — 2024</div>
            <span style={styles.kt("rgba(142,159,213,0.15)","#3a4d8f")}>Governance leader</span>
          </div>
        </div>

        {/* INSIGHT */}
        <div style={styles.ins(P)}>
          <div style={styles.insEy(P)}>Core tension — what Joe is living inside</div>
          <div style={styles.insTx}>Sodexo has world-class AI governance architecture and a recognized data leader at the top. Compass has measurable margin impact from AI in production. Governance without operational deployment is overhead. Deployment without governance is drift. Joe's framing — that <strong>operations must sponsor governance</strong> — is exactly the bridge Sodexo needs and does not yet have. That gap has a name: T3 Governance Constraint. It shows up clearly in the data below.</div>
        </div>

        {/* CHARTS ROW 1 */}
        <div style={styles.sh}><span style={styles.sl}>02</span><span style={styles.st}>Maturity and deployment comparison</span><span style={styles.sn}>FRED-style threshold analysis</span></div>
        <div style={{ ...styles.cg2, marginTop: "1rem" }}>
          <div style={styles.cc}>
            <div style={styles.ct}>AI maturity by dimension</div>
            <div style={styles.cs2}>Score 0–100. Dashed line = minimum viable enterprise AI floor (55).</div>
            <div style={styles.lg}>
              <span style={styles.le}><span style={styles.lsq(P)} />Sodexo</span>
              <span style={styles.le}><span style={styles.lsq(CO)} />Compass</span>
              <span style={styles.le}><span style={{ ...styles.lsq(RD), borderRadius: "50%" }} />Min viable floor</span>
            </div>
            <RadarChart />
          </div>
          <div style={styles.cc}>
            <div style={styles.ct}>Operational AI deployment over time</div>
            <div style={styles.cs2}>% of operations with active AI. Shaded band = industry watch zone (30–55%). FRED-style recession shading.</div>
            <div style={styles.lg}>
              <span style={styles.le}><span style={styles.lsq(P)} />Sodexo</span>
              <span style={styles.le}><span style={styles.lsq(CO)} />Compass</span>
              <span style={styles.le}><span style={styles.lbd} />Watch zone</span>
            </div>
            <LineChart />
          </div>
        </div>

        {/* HEAD TO HEAD */}
        <div style={styles.fc}>
          <div style={styles.ct}>Head-to-head: six dimensions that matter to a COO</div>
          <div style={styles.cs2}>Where each company actually stands — and what it means for margin and risk. Shaded band = critical gap zone.</div>
          <div style={styles.lg}>
            <span style={styles.le}><span style={styles.lsq(P)} />Sodexo</span>
            <span style={styles.le}><span style={styles.lsq(CO)} />Compass</span>
            <span style={styles.le}><span style={styles.lbd} />Critical gap zone</span>
          </div>
          <BarChart />
        </div>

        {/* VERDICT */}
        <div style={styles.sh}><span style={styles.sl}>03</span><span style={styles.st}>Verdict — what this means for leadership</span><span style={styles.sn}>Non-technical summary</span></div>
        <div style={{ ...styles.vg, marginTop: "1rem" }}>
          <div style={styles.vc}>
            <div style={styles.vh("rgba(142,159,213,0.15)","rgba(142,159,213,0.35)")}>
              <span style={styles.vn}>Sodexo</span>
              <span style={styles.vbg(P)}>Governance-first</span>
            </div>
            <VRow dim="Governance architecture" val="Strong" dot="green" />
            <VRow dim="CDIO / data leadership" val="Award-winning (2024)" dot="green" />
            <VRow dim="Operational AI deployment" val="Lagging — ~22% coverage" dot="amber" />
            <VRow dim="Ops-to-governance bridge" val="Gap — no clear owner" dot="red" />
            <VRow dim="Margin impact from AI" val="Unclear / not publicized" dot="amber" />
            <VRow dim="Speed of iteration" val="Moderate" dot="amber" />
          </div>
          <div style={styles.vc}>
            <div style={styles.vh("rgba(45,138,107,0.15)","rgba(45,138,107,0.25)")}>
              <span style={styles.vn}>Compass Group</span>
              <span style={styles.vbg(CO)}>Deployment-first</span>
            </div>
            <VRow dim="Governance architecture" val="Developing" dot="amber" />
            <VRow dim="CDIO / data leadership" val="Not publicly recognized" dot="amber" />
            <VRow dim="Operational AI deployment" val="Leading — ~50% coverage" dot="green" />
            <VRow dim="Ops-to-governance bridge" val="Ops-driven by default" dot="amber" />
            <VRow dim="Margin impact from AI" val="Measurable, cited publicly" dot="green" />
            <VRow dim="Speed of iteration" val="Fast" dot="green" />
          </div>
        </div>

        {/* FAANG */}
        <div style={styles.sh}><span style={styles.sl}>04</span><span style={styles.st}>FAANG benchmark — Amazon as the pace setter</span><span style={styles.sn}>Where enterprise services AI lags</span></div>
        <div style={{ ...styles.fc, marginTop: "1rem" }}>
          <div style={styles.ct}>Amazon vs enterprise services AI</div>
          <div style={styles.cs2}>Amazon (AWS + Amazon Business + Whole Foods ops) sets the deployment pace. Both Sodexo and Compass lag significantly on real-time adaptation and feedback loop velocity — this is not a technology gap, it's an operations sponsorship gap.</div>
          <div style={styles.lg}>
            <span style={styles.le}><span style={styles.lsq(P)} />Sodexo</span>
            <span style={styles.le}><span style={styles.lsq(CO)} />Compass</span>
            <span style={styles.le}><span style={styles.lsq(RD)} />Amazon benchmark</span>
          </div>
          <FaangChart />
        </div>

        {/* CALL PREP */}
        <div style={styles.sh}><span style={styles.sl}>05</span><span style={styles.st}>Pre-call intelligence</span><span style={styles.sn}>What to bring into the room</span></div>
        <div style={{ ...styles.qb, marginTop: "1rem" }}>
          <div>
            <div style={styles.ql}>What Joe already knows</div>
            <div style={styles.qt}>Governance without an ops sponsor is theater. He said it. That's the CES gap language without the framework name attached to it. He's already thinking in the right direction — you're bringing the structure that validates it.</div>
          </div>
          <div>
            <div style={styles.ql}>The question to ask Joe</div>
            <div style={styles.qt}><strong style={{ color: "white" }}>"If Sodexo's AI criteria drift from market conditions tomorrow — who gets the call, and how fast does it close?"</strong> That one question maps directly to where Compass is winning and Sodexo is not.</div>
          </div>
          <div>
            <div style={styles.ql}>Your positioning</div>
            <div style={styles.qt}>You built a framework that names the gap Joe is already living. You're not selling. You're validating his instinct with structure — and offering a 4-week sprint to close what's open.</div>
          </div>
        </div>

        <div style={styles.ins(RD)}>
          <div style={styles.insEy(RD)}>DBL Verdict — T3 Governance Constraint</div>
          <div style={styles.insTx}>The gap between Sodexo's governance sophistication and its operational deployment is not an architecture problem and not a technology problem. It is a <strong>control layer gap between detection and enforced action</strong>. The system can surface a problem. No single person is accountable for closing the loop. That's where the sprint begins.</div>
        </div>

      </div>

      <footer style={styles.footer}>
        <span style={styles.fb}>Epoch Frameworks LLC &nbsp;|&nbsp; Behavioral Intelligence Research</span>
        <span style={styles.fn}>AI Adoption Architect + EBT v2.6 &nbsp;|&nbsp; Not for distribution &nbsp;|&nbsp; April 2026</span>
      </footer>
    </div>
  );
}
