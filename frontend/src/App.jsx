
import { useState } from "react";
import API from "./services/api";
import Footer from "./components/Footer";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeWebsite = async () => {
    if (!url) {
      alert("Please enter a website URL");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/analyze", { url });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze website.");
    } finally {
      setLoading(false);
    }
  };

  const card = {
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#EEF2FF,#DBEAFE,#FFFFFF)",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "850px",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "42px", color: "#0F172A", marginBottom: "10px" }}>
          🚀 Page Pulse
        </h1>

        <h2 style={{ textAlign: "center", color: "#2563eb", marginBottom: "10px" }}>
          Analyze Any Website in Seconds
        </h2>

        <p style={{ textAlign: "center", color: "#64748B", marginBottom: "25px" }}>
          Instant SEO Analysis • Website Performance • Health Report
        </p>

        <div style={{ display: "flex", marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "10px 0 0 10px",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={analyzeWebsite}
            style={{
              padding: "16px 30px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "0 10px 10px 0",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {result && (
          <>
            <h2 style={{ marginBottom: "20px" }}>📊 Analysis Results</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "15px",
              }}
            >
              <div style={card}><b>Status</b><br />{result.status}</div>
              <div style={card}><b>SEO Score</b><br />{result.seo_score}/100</div>
              <div style={card}><b>Response Time</b><br />{result.response_time}</div>
              <div style={card}><b>Word Count</b><br />{result.word_count}</div>
              <div style={card}><b>H1 Count</b><br />{result.h1_count}</div>
              <div style={card}><b>Missing ALT</b><br />{result.missing_alt_images}</div>
              <div style={card}><b>HTTPS</b><br />{result.https_enabled ? "✅ Enabled" : "❌ Disabled"}</div>
              <div style={card}><b>Robots.txt</b><br />{result.robots_txt ? "✅ Found" : "❌ Missing"}</div>
              <div style={card}><b>Sitemap.xml</b><br />{result.sitemap_xml ? "✅ Found" : "❌ Missing"}</div>
              <div style={card}><b>Title</b><br />{result.title}</div>
              <div style={{...card, gridColumn:"1 / span 2"}}>
                <b>Meta Description</b><br />
                {result.meta_description}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
