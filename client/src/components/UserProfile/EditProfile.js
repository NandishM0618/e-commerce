import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, updateProfile, clearErrors } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import "./userProfile.css";
import Loading from "../../layouts/Loader/Loading";
export default function EditProfile(params) {
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("/anime.png");
  const [avatarPreview, setAvatarPreview] = useState("/anime.png");

  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.image.url);
    }
    if (error) {
      alert("Error in Loggin In");
      dispatch(clearErrors);
    }
    if (isUpdated) {
      alert("Profile UpdatedSuccefully");
      dispatch(loadUser());
      navigate("/");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="edit-profile-container">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}
    </Fragment>
  );
}
