
import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { gapi } from 'gapi-script';
var globals = require("./klinik.json");
function App() {

  // var gapi = window.gapi
  var CLIENT_ID = '522653192806-85ec3hjti2fe6g3p8uir9oo5o90f9tss.apps.googleusercontent.com'
  var API_KEY = "AIzaSyCsYdqsnk2zTVuEjgDdpr3RFW7a_ImLGV4"
  var DISCOVERY_DOCS=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"
  const handleClick = () => {
    gapi.load("client:auth2", () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
        plugin_name: 'cale'
      })

      gapi.client.load('calendar', 'v3', () => {console.log('oke');})

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        const event = {
          'summary': "Test auto doctor to g calendar", // or event name
          'location': "Rumah sakit", //where it would happen
          'description': 'Jadwal Tele dengan dokter',
          'start': {
            'dateTime': '2022-10-07T13:00:00-07:00',
            'timeZone': 'Asia/Jakarta'
          },
          'end': {
            'dateTime': '2022-10-07T14:00:00-07:00',
            'timeZone': 'Asia/Jakarta'
          },
          'attendees': [
            {'email': 'bjmaranata@gmail.com'},
            {'email': 'annisa.seftiani@aido.id'},
            {'email': 'dimas.pamungkas@aido.id'}
          ],
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1' 
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'popup', 'minutes': 20}
            ]
          }
        }

        const request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })

      })
    })

  }

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
