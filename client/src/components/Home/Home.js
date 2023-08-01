import React, { Fragment, useEffect } from "react";
import "./home.css";
import Product from "../ProductCard/Product";
import Metadata from "../../layouts/Metadata";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loading from "../../layouts/Loader/Loading";

export default function Home(params) {
  const handleScrollToNext = () => {
    const container = document.getElementById("container");
    container.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title="E-commerce" />
          <div className="banner">
            <p>Welcome to Shopify</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <button
              onClick={handleScrollToNext}
              style={{
                backgroundColor: "rgba(255,255,255,0.7)",
                color: "#333",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              Scroll
            </button>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
