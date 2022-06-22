import React, { useState } from "react";
import { Avatar } from "@mui/material";
import TazData from "./TazData";
import "./Sidebar.css";
import { UserAuth } from "../AuthContextProvider";
export const Sidebar = () => {
  const {user} = UserAuth();
  const [taz, setTaz] = useState(TazData[0]);
  const getTaz = () => {
    let randomNum = Math.floor(Math.random() * TazData.length);
    setTaz(TazData[randomNum]);
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {/* <img src={bg} alt="bg" /> */}
        <Avatar src={user&&user.photoURL} className="sidebar__avatar" />
        <h2>{user && user.displayName}</h2>
        <h4>Senior year at IIUM KICT</h4>
      </div>

      <div className="sidebar__bottom">
        <h2>Islamic Tazkirah</h2>
        <p className="sidebar__taz" align="justify">
          {taz.Taz}
        </p>
        <button className="tazbtn" onClick={getTaz}>
          More Tazkirah
        </button>
      </div>
    </div>
  );
};
