import "./App.css";
import { data } from "./data/data";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PharmacyList from "./components/PharmacyList";
import MapContainer from "./components/MapContainer";
import spinner from "./assets/spinner.gif";

function App() {
  const [coordinate, setCoordinate] = useState({
    lat: null,
    lng: null,
  });

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    fetch("https://ip-geo-location.p.rapidapi.com/ip/check?format=json", {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "ip-geo-location.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const latitude = parseFloat(result.location.latitude);
          const longitude = parseFloat(result.location.longitude);
          setCoordinate({
            lat: latitude,
            lng: longitude,
          });
          setUserLocation({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          console.log(`Error:`, error);
        }
      );
  }, []);

  return (
    <div className="flex flex-col">
      {/* Flex item 1: Headbar */}
      <div className="inset-x-0 md:fixed md:top-0 md:z-10">
        <Header />
      </div>

      {/* Flex item 2: Main content */}

      <div className="max-w-xl flex flex-col-reverse md:flex-row md:absolute md:top-28 md:h-2/3 main-content">
        {/* Left */}
        <div className="md:overflow-y-scroll md:min-h-3/4 md:min-w-1/2 md:h-full pharmacy-list">
          <PharmacyList
            changeCoor={(coor) => setCoordinate(coor)}
            userLocation={userLocation}
            data={data}
          />
        </div>

        {/* Right */}
        <div className="mx-auto md:overflow-y-scroll md:h-full map center">
          {coordinate.lat ? (
            <MapContainer
              coordinate={coordinate}
              lat={coordinate.lat}
              lng={coordinate.lng}
              className="map-container"
            />
          ) : (
            <div className="center">
              <img className="center-child" src={spinner} alt="Loading..." />
            </div>
          )}
        </div>
      </div>

      {/* Flex item 3: Bottom Footer  */}
      <div className="footer md:absolute inset-x-0 bottom-0 z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
