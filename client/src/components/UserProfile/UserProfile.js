import { Fragment } from "react";
import MetaData from "../../layouts/Metadata";
import { useSelector } from "react-redux";
import "./userProfile.css";
import Loading from "../../layouts/Loader/Loading";
import { Link } from "react-router-dom";

export default function UserProfile(params) {
  const { user, loading } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <h2>My Profile</h2>
          <div className="user-profile">
            <div className="profile-image">
              <img
                src={user.image.url ? user.image.url : "/default-profile.png"}
                alt="Profile"
              />
              <Link to="/me/account">
                <button style={{ marginLeft: "0px" }}>Edit Profile</button>
              </Link>
            </div>

            <div className="profile-info">
              <h2> {user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Joined on: {new Date(user.createdAt).toDateString()}</p>
              <div className="profile-links">
                <Link to="/orders" className="profile-link">
                  Order
                </Link>
                <Link to="/password/account" className="profile-link">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}
