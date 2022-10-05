
import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
var globals = require("./klinik.json");
function App() {

	const [subdomain, setSubDomain] = useState(null);
	useEffect(() => {
		const host = window.location.host; // gets the full domain of the app

		const arr = host
			.split(".")
			.slice(0, host.includes("localhost") ? -1 : -2);
		if (arr.length > 0) setSubDomain(arr[0]);
	}, []);

  const requestedUser = globals.find((global) => global.slug === subdomain);
  console.log("requestedUser", requestedUser)
  return (
    <div className="App">
      <header className="App-header">
        <img src={requestedUser !== undefined ? requestedUser.details.logo : logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default App;
