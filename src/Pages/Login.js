import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import { UserAuth } from "../AuthContextProvider";
import Layout2 from "../Components/Layout2";
function Login() {
  const {signIn} = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleClick = async (e)  => {
    e.preventDefault();
    try {
      await signIn(email, password)
        .then((cred) => {
          console.log(cred.user.uid);
          navigate("/Home")
        });
      alert("Welcome back");
    } catch (error) {
      alert("Incorrect Email or Password")
    }
  };


  return (
  <Layout2>
    <div className="login">
      {/* <p>user Email: {user&&user.email}</p> */}
      <h1>Login</h1>
      <form>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleClick} type="submit">
          {" "}
          Login
        </button>
      </form>
      <p>
        Not registered? <Link to="/signup">Click here</Link>
      </p>
      
    </div>
    </Layout2>
  
  );
}

export default Login;
