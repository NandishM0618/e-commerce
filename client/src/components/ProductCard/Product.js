import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./product.css";

export default function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.image[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> <span>({product.numOfReview} reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
}
