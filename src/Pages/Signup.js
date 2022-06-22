import React from "react";
import { useState, useRef} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../AuthContextProvider";
import Layout2 from "../Components/Layout2";
import "./Signup.css";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
const {createUser} = UserAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password)
      .then((cred)=>{
          cred.user.updateProfile({
          displayName: name,
          photoURL: '',
         
        })
      })
      alert("Sign Up is successful");
      navigate("/login")
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Layout2>
    <div className="signup">
      <h1>SignUp</h1>
      <form>
        <input
          type="text"
          id="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleClick} type="submit">
          {" "}
          SignUp
        </button>
      </form>
      <p>
        Already registered? <Link to="/login">Click here</Link>
      </p>
    </div>
    </Layout2>
  );
}

export default Signup;
