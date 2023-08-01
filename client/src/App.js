import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { createBrowserHistory } from "history";
import Header from "./layouts/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./layouts/Footer/Footer";
import ProductDetails from "./components/ProductD/ProductDetails";
import Products from "./components/ProductD/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserDetails from "./layouts/UserDetails/UserDetails";
import UserProfile from "./components/UserProfile/UserProfile";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { loadStripe } from "@stripe/stripe-js";
import EditProfile from "./components/UserProfile/EditProfile";
import UpdatePassword from "./components/UserProfile/UpdatePassword";
import Payment from "./components/Cart/Payment";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import OrderSuccess from "./components/Cart/OrderSuccess";
import OrderDetails from "./components/Orders/OrderDetails";
import MyOrders from "./components/Orders/MyOrders";
import About from "./layouts/About/About";

function App() {
  const history = createBrowserHistory();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router history={history}>
      <Header />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}

      <Routes>
        {
          <>
            isAuthenticated &&
            <Route exact path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
          </>
        }
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated && (
          <Route path="/accountDetails" element={<UserDetails />} />
        )}
        {isAuthenticated && (
          <Route exact path="/account" element={<UserProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/me/account" element={<EditProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/password/account" element={<UpdatePassword />} />
        )}
        {isAuthenticated && <Route path="/cart" element={<Cart />} />}
        {isAuthenticated && <Route path="/shipping" element={<Shipping />} />}
        {isAuthenticated && (
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        )}
        {isAuthenticated && (
          <Route path="/success" element={<OrderSuccess />} />
        )}
        {isAuthenticated && (
          <Route path="/order/:id" element={<OrderDetails />} />
        )}
        {isAuthenticated && <Route path="/orders" element={<MyOrders />} />}
        <Route
          Component={
            window.location.pathname == "/process/payment" ? null : "Not Found"
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
