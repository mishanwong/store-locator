import React, { useState, useEffect } from "react";
import PharmacyCard from "./PharmacyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PharmacyList = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [displayList, setDisplayList] = useState([]);
  const [message, setMessage] = useState(null);
  const [sortedList, setSortedList] = useState([]);
  let arrayWithDistance = [];

  const handleSearch = (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    // Validate 5-digit zipcode
    const validateZipcode = (zip) => {
      const zipRegex = /(^\d{5}$)/;
      return zipRegex.test(zip) | (zip === "");
    };

    const isValid = validateZipcode(zipcode);

    if (!isValid) {
      setErrorMessage("Please enter a valid 5-digit zipcode");
    }

    if (isValid) {
      const filtered = sortedList.filter((pharmacy) => {
        return pharmacy.zipcode.slice(0, 3) === zipcode.slice(0, 3);
      });
      setDisplayList(filtered);

      if (filtered.length === 0) {
        setMessage("No pharmacies nearby");
      }
    }

    if (zipcode === "") {
      setMessage(null);
      setDisplayList(sortedList);
    }
  };

  const handleChange = (e) => {
    setZipcode(e.target.value);
  };

  const calculateDistance = () => {
    const distance = require("gps-distance");
    let dist, distanceInMiles;
    if (props.userLocation.lat !== null) {
      props.data.map((item) => {
        dist = distance(
          props.userLocation.lat,
          props.userLocation.lng,
          item.coordinate.lat,
          item.coordinate.lng
        );
        distanceInMiles = dist / 1.609;
        arrayWithDistance.push({ ...item, distance: distanceInMiles });

        return { ...item, distance: distanceInMiles };
      });
      let a = arrayWithDistance.sort((a, b) => a.distance - b.distance);
      setDisplayList(a);
      setSortedList(a);
    }
  };

  useEffect(calculateDistance, [
    props.userLocation.lat,
    props.userLocation.lng,
  ]);

  return (
    <div className="mx-auto w-5/6 md:w-2/3 max-w-screen-sm md:max-w-screen-md md:mb-20">
      <button
        onClick={() => setExpanded(!expanded)}
        className="bg-purple-500 hover:bg-purple-600 focus:outline-none rounded-md px-6 py-3 mx-auto my-4 block text-white transition duration-500 ease-in-out w-full"
      >
        SEARCH
      </button>

      {expanded && (
        <form onSubmit={handleSearch}>
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Enter zipcode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="ml-2 focus:outline-none hover:text-purple-600"
            >
              <FontAwesomeIcon icon={faSearch} className="text-3xl" />
            </button>
          </div>
        </form>
      )}
      <p className="text-sm text-red-600">{errorMessage}</p>
      <p className="text-lg text-center my-8">{message}</p>
      <div>
        {displayList.map((item) => (
          <div key={item.id}>
            <PharmacyCard
              data={item}
              changeCoor={props.changeCoor}
              userLocation={props.userLocation}
              distance={item.distance}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyList;
