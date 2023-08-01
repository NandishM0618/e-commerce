import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

export default function Header(params) {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/">Shopify</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">
            <FaCartPlus />{" "}
          </Link>
          <form className="searchBox" onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="input"
            />

            <input type="submit" value="search" className="btn-search" />
          </form>
          {isAuthenticated ? (
            <Link to="/accountDetails">
              <img src={user?.image?.url} alt="profile" />
            </Link>
          ) : (
            <div className="right-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
