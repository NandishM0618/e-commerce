import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer(params) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <div className="footerHeading">
            <h2>Shopify</h2>
          </div>

          <p>
            E-commerce App is your one-stop destination for all your shopping
            needs. We offer a wide range of products at competitive prices,
            delivered right to your doorstep.
          </p>
        </div>
        <div className="footer-social">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} E-commerce App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
