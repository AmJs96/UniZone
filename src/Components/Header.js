import React from "react";
import "./Header.css";
import HeaderOptions from "./HeaderOptions";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

import { useNavigate } from "react-router";
import { UserAuth } from "../AuthContextProvider";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      alert("You are logged out");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <img src={Logo} alt="UniZone" />
        <h2 className="header__webname">UniZone</h2>

        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header__right">
        <Link style={{ textDecoration: "none" }} to="/home">
          <HeaderOptions Icon={HomeIcon} title="Home" />
        </Link>
        <Link style={{ textDecoration: "none" }} to="/message">
          <HeaderOptions Icon={EmailIcon} title="Massage" />
        </Link>
        {/* <HeaderOptions Icon={NotificationsRoundedIcon} title="Notification" /> */}
        <Link style={{ textDecoration: "none" }} to="/profile">
          <HeaderOptions avatar={user&&user.photoURL} title={user && user.displayName} />
        </Link>
        <button onClick={handleLogout}>SignOut</button>
      </div>
    </div>
  );
}

export default Header;


