import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import mapData from "../resources/countries.json";
import cityjsonData from "../resources/world_cities.json";
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from "react-leaflet";
import MapComponent from "./components/MapComponent"
import LegendComponent from "./components/LegendComponent"
import LoginSignUpComponent from './components/LoginSignUpComponent';
import { getCurrentUser, logOut } from './components/auth';

function App() {
  const [count, setCount] = useState(0)
  const position = [51.505, -0.09];
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);


  const handleLogout = () => {
    logOut();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginSignUpComponent onLogin={() => setCurrentUser(getCurrentUser())} />;
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <header style={{ padding: "0", textAlign: "center", backgroundColor: "#2c3e50", color: "white" }}>
            <div style={{ float: "left", padding: "1rem", fontStyle: "bold", fontSize: "30px" }}>Global Population Tracker</div>
            <div style={{ float: "left", padding: "1rem", fontStyle: "bold", fontSize: "20px" , paddingTop: "25px"}}>(click on any country to get started)</div>
            {currentUser ? (
              <h2 style={{ float: "right", padding: "1rem" }}>
                <button onClick={handleLogout}>Logout</button>
              </h2>
            ) : (
              <h2 style={{ float: "right", padding: "1rem" }}>Login</h2>
            )}


        </header>
        <main style={{ flex: "1 0 auto" }}>

          <div style={{ position: "relative"}}  >
            <MapComponent />
            <div>
            
              <div>
                <LegendComponent />
              </div>
            </div>
          </div>


        </main>
        <footer style={{ padding: "0", textAlign: "center", backgroundColor: "#2c3e50", color: "white" }}>
            <p style={{ margin: "0", padding: "1rem" }}>2024</p>
        </footer>
      </div>
    </>
  )
}

export default App
