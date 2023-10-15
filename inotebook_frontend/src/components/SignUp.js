import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  //------------------
  const navigate = useNavigate();

  const [signup, setSignup] = useState({ name: "", email: "", password: "" });

  
  const host = `${process.env.REACT_APP_HOST}/api/auth`;

  const onChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/createuser`, {
      // *GET, POST, PUT, DELETE, etc.
      method: "POST",
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "Content-Type": "application/json",
      },

      // body data type must match "Content-Type" header

      body: JSON.stringify({
        name: signup.name,
        email: signup.email,
        password: signup.password,
      }),
    });

    // // parses JSON response into native JavaScript objects
    const json = await response.json();
    console.log("Signup")
    console.log(json);

    if (json.Success) {
      localStorage.setItem("token", json.auth_Token);
      navigate("/");
    } else {
      alert("SignUp with Valid details");
    }
  };

  return (
    <div className="Login">
      <h2>Sign Up</h2>
      <div>
        <form className="LoginPage">
          <label htmlFor="user">
            <h5>User Name:</h5>
          </label>
          <input type="text" id="name" name="name" onChange={onChange} />
          <br />
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
              Sign Up
            </button>
          </div>
          <h5 className="H5">
            Already have an account? <Link to="/">Log In</Link>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
