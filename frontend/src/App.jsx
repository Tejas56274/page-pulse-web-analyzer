import { useState } from "react";
import API from "./services/api";

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

      const response = await API.post("/analyze", {
        url: url,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "550px",
          padding: "30px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🚀 Page Pulse</h1>

        <p style={{ textAlign: "center", color: "gray" }}>
          Analyze any website instantly
        </p>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={analyzeWebsite}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Website"}
        </button>

        {result && (
          <div style={{ marginTop: "30px" }}>
            <h3>Results</h3>

            <p><b>Status:</b> {result.status}</p>
            <p><b>Response Time:</b> {result.response_time}</p>
            <p><b>Title:</b> {result.title}</p>
            <p><b>Meta:</b> {result.meta_description}</p>
            <p><b>H1 Count:</b> {result.h1_count}</p>
            <p><b>Missing ALT:</b> {result.missing_alt_images}</p>
            <p><b>Word Count:</b> {result.word_count}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;