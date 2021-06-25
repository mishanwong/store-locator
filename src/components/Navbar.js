import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faStore } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-white shadow-md py-4">
      <div className="text-green-500">
        <p className="ml-8 font-bold">
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </p>
      </div>
      <div className="text-blue-600">
        <p className="mr-8 font-bold">
          <FontAwesomeIcon icon={faStore} /> Select Pharmacy
        </p>
      </div>
    </div>
  );
};

export default Navbar;
