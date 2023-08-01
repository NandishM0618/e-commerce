import ReactStars from "react-rating-stars-component";
import profilePng from "../../assets/anime.jpg";
import "./reviewCard.css";

export default function ReviewCard({ review }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
  };
  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-user">
          <img src={profilePng} alt={review.name} className="user-avatar" />
          <span className="user-name">{review.user}</span>
        </div>
        <ReactStars {...options} />
      </div>
      <div className="review-card-body">
        <p className="review-text">{review.comment}</p>
      </div>
    </div>
  );
}
