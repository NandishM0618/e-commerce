import { Typography } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import "./orderSuccess.css";
import { Link } from "react";
export default function OrderSuccess(params) {
  return (
    <div className="orderSuccess">
      <FaCheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}
