import React from "react";
import Logo from "./images/logo.png";

import "./LogoHeader.css"
function LogoHeader() {
  return (
    <div className="Logoheader">
      <div className="Logoheader__left">
        <img src={Logo} alt="UniZone" />
        <h2 className="Logoheader__webname">UniZone</h2>
      </div>
    </div>
  );
}

export default LogoHeader;
