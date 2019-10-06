import React from "react";
import ReactDOM from "react-dom";

import { Viewport } from "./components/Viewport";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Viewport />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
