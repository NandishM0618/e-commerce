import { Fragment, useState } from "react";
import "./userDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userAction";

export default function UserDetails() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
    alert("Logout Successfully");
  }
  const [selectedTab, setSelectedTab] = useState("profile");

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };
  return (
    <Fragment>
      <div className="user-dashboard">
        {/* Sidebar with navigation links */}
        <div className="sidebar">
          <button onClick={() => handleTabChange("profile")}>
            <Link to="/account">Profile</Link>
          </button>
          <button onClick={() => handleTabChange("orders")}>
            <Link to={`/orders`}>Orders</Link>
          </button>
          <button onClick={() => handleTabChange("cart")}>
            <Link to={`/cart`}>Cart</Link>
          </button>
          <button
            onClick={logoutUser}
            className="btn-red"
            style={{ backgroundColor: "red", color: "white" }}
          >
            Logout
          </button>
        </div>

        {/* Main content area */}
        <div className="content">
          {selectedTab === "profile" && (
            <div className="profile-section">
              <img
                src={user.image.url ? user.image.url : "/default-profile.png"}
                alt="Profile"
                className="profile-image"
              />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )}

          {selectedTab === "orders" && (
            <Link to="/orders">
              <div className="orders-section">
                <h2>Orders</h2>
              </div>
            </Link>
          )}

          {selectedTab === "cart" && (
            <div className="cart-section">
              <h2>Cart</h2>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
