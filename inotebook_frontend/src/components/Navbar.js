import React from "react";
import "../style/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout ,AiOutlineLogin} from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <div className="item">
        {!localStorage.getItem("token") ? (
          <ul>
            <li>
              <Link to="/"><AiOutlineLogin/>Log In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link onClick={handleLogout} to="/">
                <AiOutlineLogout/>Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
