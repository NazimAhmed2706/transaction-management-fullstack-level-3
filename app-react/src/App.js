// Import NPM Modules
import React from "react";
import axios from "axios";

// Import Relative Local Modules
import "./App.css";
import Root from "./components/Root";
console.log("App.js= => Relative Local modules imported");

function App() {
  console.log("App.js= => App - function call");

  // Check Server Status
  axios
    .get("http://localhost:5000/ping")
    .then((res) => {
      console.log(
        "App.js= => App => GET http://localhost:5000/ping(server health check) : ",
        res.data
      );
    })
    .catch((err) => console.error(err));

  return (
    <div className="common-font">
      <Root />
    </div>
  );
}

export default App;
