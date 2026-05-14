import { useState, useEffect } from "react";

const PILLARS = [
  { id: "P1", name: "Digital Twin", color: "#2563EB", icon: "🏗️" },
  { id: "P2", name: "AI Recommendations", color: "#DC2626", icon: "🤖" },
  { id: "P3", name: "Data Governance", color: "#16A34A", icon: "🛡️" },
  { id: "P4", name: "Omnichannel", color: "#EA580C", icon: "🔗" },
];

const JOURNEY_STEPS = [
  {
    id: 0,
    title: "Sara Browses on IKEA App",
    subtitle: "Stockholm, Sweden — Tuesday Evening",
    narrative: "Sara, an IKEA Family member, opens the IKEA app and uses Kreativ to scan her living room in 3D. She browses sofas, saves a LANDSKRONA to her wishlist, and spends 8 minutes exploring room configurations.",
    activePillars: ["P2", "P3", "P4"],
    pillarDetails: {
      P1: { status: "standby", detail: "No store visit yet. Twin awaits in-store signals." },
      P2: { status: "active", detail: "Collaborative filtering identifies sofa preferences. Content-based model analyses her room scan dimensions. Generates 6 personalised recommendations including complementary items (rug, side table, lamp)." },
      P3: { status: "active", detail: "Consent verified: Sara opted in via IKEA Family (GDPR-compliant, Swedish DPA jurisdiction). Session data governed under legitimate interest. Recommendation logic logged for algorithmic fairness audit trail." },
      P4: { status: "active", detail: "App session synced to unified CDP. Customer identity graph updated. Kreativ room scan stored as digital asset linked to Sara's profile for cross-channel continuity." },
    },
    dataFlows: [
      "App interaction data → Unified CDP (P4)",
      "CDP profile → AI Rec Engine (P2)",
      "Consent status check → Governance layer (P3)",
      "Room scan asset → stored for in-store use",
    ],
    metrics: { interactions: "14 products viewed", recAccuracy: "78% relevance score", consentStatus: "Active opt-in", channelSync: "Real-time" },
  },
  {
    id: 1,
    title: "Sara Visits the Store",
    subtitle: "IKEA Kungens Kurva, Stockholm — Saturday Afternoon",
    narrative: "Sara walks into the IKEA warehouse store on Saturday. IoT sensors detect increased foot traffic in the living room section. The Store Operations Twin adjusts staffing. Sara's IKEA Family app check-in triggers her profile on a staff tablet.",
    activePillars: ["P1", "P2", "P3"],
    pillarDetails: {
      P1: { status: "active", detail: "Store Operations Twin activates: 847 customers currently in-store, 23% above Saturday average. Dynamic staffing: 2 additional staff allocated to living room section. Energy optimisation: HVAC reduced 12% in low-traffic warehouse aisles. Sara's foot traffic path tracked (anonymised sensor data)." },
      P2: { status: "active", detail: "AR-to-store continuity triggered. Staff tablet shows: 'Sara saved LANDSKRONA sofa (Kreativ scan: 3.2m wall). Complementary: STOENSE rug (predicted 67% match), SKAFTET lamp (domino effect: 30-day purchase probability 42%).' Natural language query available for staff." },
      P3: { status: "active", detail: "In-store tracking uses anonymised sensor data (no facial recognition). Staff tablet access requires IKEA Family check-in consent. Sara's profile display follows data minimisation: only relevant recommendations shown, not full browsing history." },
      P4: { status: "standby", detail: "Omnichannel layer synced Sara's app data to in-store systems before visit. Now monitoring for purchase or delivery booking." },
    },
    dataFlows: [
      "IoT sensors → Store Operations Twin (P1)",
      "IKEA Family check-in → Staff tablet (P2)",
      "Consent verification → Governance (P3)",
      "Twin staffing signal → 2 staff redeployed",
    ],
    metrics: { storeTraffic: "847 customers", staffOptimisation: "+2 to living room", energySaving: "-12% HVAC", profileMatch: "Sara identified" },
  },
  {
    id: 2,
    title: "Sara Buys and Books Delivery",
    subtitle: "In-Store Purchase + Last-Mile Scheduling",
    narrative: "Sara buys the LANDSKRONA sofa and the STOENSE rug (domino effect confirmed). She books home delivery for Tuesday and adds TaskRabbit assembly. The Supply Chain Twin updates demand signals across the network.",
    activePillars: ["P1", "P4"],
    pillarDetails: {
      P1: { status: "active", detail: "Supply Chain Twin receives purchase signal. Demand forecast updated: LANDSKRONA sofa velocity +3% in Stockholm cluster. Inventory reorder trigger evaluated (current stock: 14 units, reorder threshold: 8). Reverse logistics model notes: expected buyback eligibility in 18-24 months based on sofa lifecycle data." },
      P2: { status: "standby", detail: "Purchase data feeds back into recommendation model. Domino effect confirmed (rug purchased within same visit). Model accuracy updated. Next: post-purchase journey modelling for accessory recommendations at Day 7, Day 30, Day 90." },
      P3: { status: "standby", detail: "Transaction data stored under contractual necessity (GDPR Art. 6(1)(b)). Delivery address added to profile with explicit consent. Data retention: purchase history retained, browsing data auto-expires per policy." },
      P4: { status: "active", detail: "Unified commerce platform processes: cart merge (in-store POS + delivery booking), TaskRabbit assembly API call (Tuesday 2-4pm slot), EV delivery route optimisation (batch with 3 other Stockholm deliveries, zero-emission vehicle assigned), real-time tracking link sent to Sara's app." },
    },
    dataFlows: [
      "POS transaction → Supply Chain Twin (P1)",
      "Delivery booking → Fulfilment layer (P4)",
      "TaskRabbit API call → Assembly scheduled",
      "Purchase data → AI model feedback (P2)",
    ],
    metrics: { orderValue: "SEK 18,400", deliveryMode: "EV zero-emission", assemblyBooked: "TaskRabbit Tue 2-4pm", inventoryUpdate: "Real-time" },
  },
  {
    id: 3,
    title: "18 Months Later: Buyback Offer",
    subtitle: "Circular Economy Loop Closes",
    narrative: "The Digital Twin's lifecycle model predicted Sara would consider replacing her sofa around the 18-month mark. With P3 confirming consent for proactive outreach, Sara receives a personalised buyback offer via the app, with the returned sofa routed to the nearest refurbishment centre.",
    activePillars: ["P1", "P2", "P3", "P4"],
    pillarDetails: {
      P1: { status: "active", detail: "Product lifecycle model triggered: LANDSKRONA sofas show 22% replacement probability at 18 months in the Nordic cluster. Reverse logistics simulation: nearest refurbishment centre (Malmo) has 73% capacity utilisation, can absorb the unit. Reconditioned sofa demand forecast: highest in Berlin and Amsterdam markets. Circular economy dashboard updated." },
      P2: { status: "active", detail: "Buyback offer personalised: 'Trade in your LANDSKRONA for SEK 3,200 credit toward any sofa.' Replacement recommendations generated based on Sara's updated room scan and browsing patterns since purchase. New recommendation: MORABO sofa (higher segment, predicted upgrade path based on lifecycle data)." },
      P3: { status: "active", detail: "Proactive outreach consent verified (IKEA Family terms, Section 4.2). Buyback offer complies with Swedish Consumer Agency guidelines. Data used: purchase date, product category, loyalty tier. Data NOT used: browsing history (expired per retention policy). Transparency report: Sara can view exactly what data informed the offer via her DSAR portal." },
      P4: { status: "active", detail: "Buyback logistics initiated: pickup scheduling via app, EV fleet routing for collection, refurbishment centre receiving notification. If Sara accepts, the full loop completes: old sofa collected, credit applied, new sofa delivered, all through the unified commerce platform." },
    },
    dataFlows: [
      "Lifecycle prediction (P1) → Trigger outreach",
      "Consent check (P3) → Approved for proactive contact",
      "Personalised offer (P2) → App notification",
      "Reverse logistics (P4) → Pickup + refurbishment routing",
    ],
    metrics: { buybackCredit: "SEK 3,200", refurbCapacity: "73% (Malmo)", secondaryDemand: "Berlin, Amsterdam", circularLoop: "Fully closed" },
  },
];

function PillarBadge({ pillar, isActive, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 16px", borderRadius: 10,
        border: selected ? `2.5px solid ${pillar.color}` : "2px solid #E2E8F0",
        background: isActive ? `${pillar.color}10` : "#FAFAFA",
        opacity: isActive ? 1 : 0.4,
        cursor: isActive ? "pointer" : "default",
        transition: "all 0.3s ease",
        transform: selected ? "scale(1.03)" : "scale(1)",
        boxShadow: selected ? `0 4px 16px ${pillar.color}25` : "none",
        minWidth: 180,
      }}
    >
      <span style={{ fontSize: 22 }}>{pillar.icon}</span>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: pillar.color, letterSpacing: 0.5 }}>{pillar.id}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1E293B" }}>{pillar.name}</div>
      </div>
      {isActive && (
        <span style={{
          marginLeft: "auto", width: 10, height: 10, borderRadius: "50%",
          background: pillar.color, animation: "pulse 1.5s infinite",
        }} />
      )}
    </button>
  );
}

function DataFlowItem({ text, index }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
      background: "#F0F9FF", borderRadius: 8, borderLeft: "3px solid #2563EB",
      animation: `slideIn 0.4s ease ${index * 0.1}s both`,
      fontSize: 14, color: "#1E40AF", fontWeight: 500,
    }}>
      <span style={{ fontSize: 16 }}>→</span>
      {text}
    </div>
  );
}

function MetricCard({ label, value, color }) {
  return (
    <div style={{
      padding: "14px 18px", borderRadius: 10,
      background: "white", border: "1px solid #E2E8F0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      minWidth: 150, flex: 1,
    }}>
      <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: color || "#0F172A", marginTop: 4 }}>{value}</div>
    </div>
  );
}

export default function IKEAPrototype() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const step = JOURNEY_STEPS[currentStep];

  useEffect(() => {
    setSelectedPillar(null);
    setAnimKey(k => k + 1);
  }, [currentStep]);

  const activePillar = selectedPillar ? step.pillarDetails[selectedPillar] : null;

  return (
    <div style={{
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      background: "#F8FAFC", minHeight: "100vh", color: "#0F172A",
    }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div style={{
        background: "white", borderBottom: "1px solid #E2E8F0",
        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#003399" }}>IKEA</div>
          <div style={{ width: 1, height: 28, background: "#CBD5E1" }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Integrated Digital Transformation Prototype</div>
            <div style={{ fontSize: 12, color: "#64748B" }}>Group 3 — Customer Journey Simulation</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {PILLARS.map(p => (
            <span key={p.id} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}30`,
            }}>
              {p.icon} {p.id}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline Navigation */}
      <div style={{
        background: "white", borderBottom: "1px solid #E2E8F0",
        padding: "20px 32px", display: "flex", alignItems: "center", gap: 0,
      }}>
        {JOURNEY_STEPS.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <button
              onClick={() => setCurrentStep(i)}
              style={{
                display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                padding: "10px 16px", borderRadius: 10, border: "none",
                background: currentStep === i ? "#003399" : "transparent",
                transition: "all 0.3s",
                width: "100%",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: currentStep === i ? "#FFDA1A" : currentStep > i ? "#003399" : "#E2E8F0",
                color: currentStep === i ? "#003399" : currentStep > i ? "white" : "#94A3B8",
                fontSize: 14, fontWeight: 800, flexShrink: 0,
              }}>
                {currentStep > i ? "✓" : i + 1}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{
                  fontSize: 13, fontWeight: 700,
                  color: currentStep === i ? "white" : "#334155",
                }}>{s.title}</div>
                <div style={{
                  fontSize: 11,
                  color: currentStep === i ? "#FFDA1A" : "#94A3B8",
                }}>{s.subtitle}</div>
              </div>
            </button>
            {i < JOURNEY_STEPS.length - 1 && (
              <div style={{
                height: 2, width: 20, flexShrink: 0,
                background: currentStep > i ? "#003399" : "#E2E8F0",
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div key={animKey} style={{ padding: "24px 32px", animation: "fadeUp 0.4s ease" }}>
        {/* Narrative */}
        <div style={{
          padding: "20px 24px", borderRadius: 12, marginBottom: 20,
          background: "linear-gradient(135deg, #EFF6FF, #F0F9FF)",
          border: "1px solid #BFDBFE", fontSize: 16, lineHeight: 1.7, color: "#1E40AF",
        }}>
          <span style={{ fontWeight: 700 }}>Scenario: </span>{step.narrative}
        </div>

        {/* Pillar Status Row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          {PILLARS.map(pillar => {
            const isActive = step.activePillars.includes(pillar.id);
            return (
              <PillarBadge
                key={pillar.id}
                pillar={pillar}
                isActive={isActive}
                selected={selectedPillar === pillar.id}
                onClick={() => isActive && setSelectedPillar(selectedPillar === pillar.id ? null : pillar.id)}
              />
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Left: Pillar Detail or Prompt */}
          <div style={{
            padding: "24px", borderRadius: 12, background: "white",
            border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            minHeight: 240,
          }}>
            {selectedPillar && activePillar ? (
              <div style={{ animation: "fadeUp 0.3s ease" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 8,
                    background: `${PILLARS.find(p => p.id === selectedPillar).color}15`,
                    fontSize: 20,
                  }}>
                    {PILLARS.find(p => p.id === selectedPillar).icon}
                  </span>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: PILLARS.find(p => p.id === selectedPillar).color }}>
                      {PILLARS.find(p => p.id === selectedPillar).name}
                    </div>
                    <div style={{
                      fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                      color: activePillar.status === "active" ? "#16A34A" : "#94A3B8",
                    }}>
                      {activePillar.status === "active" ? "● ACTIVE" : "○ STANDBY"}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#334155", margin: 0 }}>
                  {activePillar.detail}
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>👆</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#64748B" }}>Click an active pillar above</div>
                <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 6 }}>to see exactly what each system is doing at this step</div>
              </div>
            )}
          </div>

          {/* Right: Data Flows + Metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Data Flows */}
            <div style={{
              padding: "20px", borderRadius: 12, background: "white",
              border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                Data Flows at This Step
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {step.dataFlows.map((flow, i) => (
                  <DataFlowItem key={i} text={flow} index={i} />
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div style={{
              padding: "20px", borderRadius: 12, background: "white",
              border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                Live Metrics
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {Object.entries(step.metrics).map(([key, value]) => (
                  <MetricCard
                    key={key}
                    label={key.replace(/([A-Z])/g, ' $1').trim()}
                    value={value}
                    color="#003399"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 24, padding: "16px 20px", borderRadius: 12,
          background: "white", border: "1px solid #E2E8F0",
        }}>
          <button
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            style={{
              padding: "10px 24px", borderRadius: 8, border: "1px solid #CBD5E1",
              background: currentStep === 0 ? "#F1F5F9" : "white",
              color: currentStep === 0 ? "#94A3B8" : "#334155",
              fontSize: 14, fontWeight: 600, cursor: currentStep === 0 ? "default" : "pointer",
            }}
          >
            ← Previous Step
          </button>
          <div style={{ fontSize: 14, color: "#64748B", fontWeight: 600 }}>
            Step {currentStep + 1} of {JOURNEY_STEPS.length}
          </div>
          <button
            onClick={() => currentStep < JOURNEY_STEPS.length - 1 && setCurrentStep(currentStep + 1)}
            disabled={currentStep === JOURNEY_STEPS.length - 1}
            style={{
              padding: "10px 24px", borderRadius: 8, border: "none",
              background: currentStep === JOURNEY_STEPS.length - 1 ? "#94A3B8" : "#003399",
              color: "white", fontSize: 14, fontWeight: 600,
              cursor: currentStep === JOURNEY_STEPS.length - 1 ? "default" : "pointer",
            }}
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
}
