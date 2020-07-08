import React from "react";
import "./default.scss";
import Header from "./components/Header/Header";
import Homepage from "./views/Homepage/Homepage";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
