import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Landscale Agency — AI Lead Qualification for Tradesmen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #080808 0%, #141414 60%, #0A0A0A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, transparent 0%, #D4AF37 40%, #FFD700 60%, transparent 100%)",
          }}
        />

        {/* Background watermark */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -20,
            fontSize: 280,
            fontWeight: 900,
            color: "rgba(212,175,55,0.04)",
            letterSpacing: "-8px",
            lineHeight: 1,
          }}
        >
          L
        </div>

        {/* Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 32, height: 2, background: "#D4AF37" }} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D4AF37",
            }}
          >
            AI-Powered Lead Qualification
          </span>
        </div>

        {/* Logo / Brand */}
        <div
          style={{
            fontSize: 86,
            fontWeight: 900,
            color: "#F5F1E8",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: 10,
          }}
        >
          LANDSCALE
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: 44,
          }}
        >
          AGENCY
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#B8B8B8",
            lineHeight: 1.4,
            maxWidth: 700,
            marginBottom: 56,
          }}
        >
          Premium websites & AI automation for roofers, landscapers & all tradesmen.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          {["AI Estimator", "AI Chatbot", "Website Design", "Local SEO"].map((label) => (
            <div
              key={label}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#D4AF37",
                padding: "8px 16px",
                border: "1px solid rgba(212,175,55,0.3)",
                borderRadius: 999,
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom gold accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent 0%, #D4AF37 40%, #FFD700 60%, transparent 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
