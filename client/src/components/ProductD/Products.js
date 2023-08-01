import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useEffect, useState } from "react";
import Product from "../ProductCard/Product";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loading from "../../layouts/Loader/Loading";
import Metadata from "../../layouts/Metadata";
import "rc-slider/assets/index.css";

const categories = [
  "laptops",
  "electronics",
  "mobiles",
  "camera",
  "shoes",
  "earphones",
];

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, productsCount } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="products-container">
      <h1>Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Metadata title="Products - Ecommerce" />
          <div className="content-container">
            <div className="categories">
              <h3 style={{ padding: "16px" }}>Category</h3>
              <ul>
                {categories.map((category) => {
                  return (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="product-list">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
          {resPerPage < productsCount && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={handlePageChange}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="first"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          )}
        </>
      )}
    </div>
  );
}
