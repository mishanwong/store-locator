import React from "react";
import logo from "../assets/store-locator-logo.png";

const Header = () => {
  return (
    <div className="bg-purple-700 flex justify-center h-20">
      <img src={logo} alt="Logo" className="h-12 my-4" />
    </div>
  );
};

export default Header;
