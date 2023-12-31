import "./cartItemCard.css";
import { Link } from "react-router-dom";
export default function CartItemCard({ item, deleteCartItems }) {
  return (
    <div className="CartItemCard">
      <img src={item.image ? item.image : "./anime.jpg"} alt="product" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
}
