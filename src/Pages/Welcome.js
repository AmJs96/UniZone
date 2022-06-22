import React from 'react'
import Layout2 from "../Components/Layout2";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
function Welcome() {
    const navigate = useNavigate();
    const handleClick1 = (e) => {
        e.preventDefault();
        navigate("/signup")
    }
    const handleClick2 = (e) => {
        e.preventDefault();
        navigate("/login")
    }
  return (
    <Layout2>
        <div className='welcome'>
            <h1>Welcome To UniZone</h1>
            <p>The biggest social platform for university students across Malaysia</p>
        <button className='btn1' onClick={handleClick1}>Join Now</button>
        <button className='btn2' onClick={handleClick2}>Login</button>
        </div>
    </Layout2>
  )
}

export default Welcome