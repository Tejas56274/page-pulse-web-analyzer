<div
  style={{
    display: "flex",
    marginTop: "25px",
  }}
>
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
      color: "white",
      border: "none",
      borderRadius: "0 10px 10px 0",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    {loading ? "Analyzing..." : "Analyze"}
  </button>
</div>