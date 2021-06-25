import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleUp,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const PharmacyCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [distanceString, setDistanceString] = useState(props.distance);

  const formatDistance = () => {
    if (props.distance) {
      setDistanceString(
        props.distance.toLocaleString("en-IN", {
          maximumFractionDigits: 1,
        })
      );
    }
  };

  useEffect(formatDistance, [props.distance]);

  return (
    <div>
      <div className="bg-gray-100 mb-4 p-4">
        <div className="grid grid-cols-8 mb-4">
          <button
            className="focus:outline-none flex justify-center items-start"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <FontAwesomeIcon
                icon={faChevronCircleUp}
                className="text-purple-500 mt-2 text-lg"
              />
            ) : (
              <FontAwesomeIcon
                icon={faChevronCircleDown}
                className="text-purple-500 mt-2 text-lg"
              />
            )}
          </button>
          <div className="col-span-5 text-gray-600">
            <p className="font-bold text-black">{props.data.name}</p>
            <p>{props.data.address}</p>
            {expanded && (
              <p>
                {props.data.city}, {props.data.state} {props.data.zipcode}
              </p>
            )}
          </div>
          <p className="col-span-2 text-sm text-gray-600">
            {distanceString} mi
          </p>
        </div>
        {expanded && (
          <button
            onClick={() => props.changeCoor(props.data.coordinate)}
            className="w-full bg-purple-500 hover:bg-purple-600 focus:outline-none rounded-md px-6 py-3 mx-auto block text-white transition duration-500 ease-in-out"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default PharmacyCard;
