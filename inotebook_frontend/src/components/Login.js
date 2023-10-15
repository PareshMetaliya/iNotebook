import React, { useState } from "react";
import "../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });

  
  const host = `${process.env.REACT_APP_HOST}/api/auth`;

  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/login`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
      },

      // body data type must match "Content-Type" header

      body: JSON.stringify({ email: login.email, password: login.password }),
    });

    // // parses JSON response into native JavaScript objects
    const json = await response.json();

    if (json.Success) {
      localStorage.setItem("token", json.auth_Token);
      navigate("/login");
      toast.success('Login Successfully!');
    } else {
      // alert("Login with Valid details");
      toast.error("Login with Valid details");
    }
  };

  return (
    <div className="Login">
      <h2>Log In</h2>
      <div>
        {/* <div className="Loginpage"> */}

        <form className="Loginpage">
          <label htmlFor="email">
            <h5>Email:</h5>
          </label>
          <input type="email" id="email" name="email" onChange={onChange} />
          <br />
          <label htmlFor="password">
            <h5>Password:</h5>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
          />
          <div className="btn">
            <button className="loginbtn" type="submit" onClick={handleClick}>
              Log In
            </button>
          </div>
          <h5 className="H5">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </h5>
          <h5 className="H5">
            Demo Login:<br/>Email:user@gmail.com<br/>Pass:User
          </h5>
        </form>

        {/* </div> */}
      </div>
    </div>
  );
}

export default Login;
