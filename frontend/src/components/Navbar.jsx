function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ color: "#2563eb" }}>🚀 Page Pulse</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          Home
        </a>

        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          Features
        </a>

        <a
          href="https://github.com/Tejas56274"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "#2563eb" }}
        >
          GitHub
        </a>
      </div>
    </nav>
  );
}

export default Navbar;