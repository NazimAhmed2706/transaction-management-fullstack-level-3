// Import NPM Modules
import React from "react";
import ReactDOM from "react-dom/client";

// Import Relative Local Modules
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

console.log("index.js= => NPM modules and Relative Local modules imported");

// Set root element
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("index.js= => Root node defined");

// render the App
root.render(<App />);
console.log("index.js= => Render App");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
