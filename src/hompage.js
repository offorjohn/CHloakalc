import React from "react";

function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        <h1>Welcome to My Simple Page</h1>
        <p>A clean layout with Header, Body, and Footer</p>
      </header>

      {/* Body */}
      <main style={{ padding: "20px", flex: "1" }}>
        <h2>About This Page</h2>
        <p>
          This is a simple React page layout with a header at the top, a body
          section in the middle, and a footer at the bottom. You can use this
          template as a starting point for your projects.
        </p>
        <p>Feel free to customize it further!</p>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        <p>© 2024 Simple React Page. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
