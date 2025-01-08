import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./styles/global.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <section className="hero">
            <h1>Scroll Down</h1>
            <div className="scroll-indicator">
              <span>↓</span>
            </div>
          </section>
          <div style={{ height: "100vh" }} />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
