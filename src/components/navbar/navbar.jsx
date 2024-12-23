import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useFilters } from "../../context/filterContext";
import { useCart } from "../../context/cartContext";
import { useWishlist } from "../../context/wishlistContext";
import "./navbar.css";


export const NavBar = () => {
  const { token } = useAuth();
  const { filterState, filterDispatch } = useFilters();
  const [isVisible, setIsVisible] = useState(true);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const activeStyle = ({ isActive }) => ({
    color: isActive ? "var(--primary-color)" : "black",
    textDecoration: "none",
  });

  return (
    <>
      <div
        className="top-bar"
        style={{
          display: isVisible && token === "" ? "block" : "none",
        }}
      >
        Sign up and get exclusive offers.
        <i onClick={() => setIsVisible(false)} className="fa-solid fa-xmark"></i>
      </div>
      <div className="nav">
        <div className="navbar">
          <p className="welcome-message">
            Welcome to <br /> Mytalorzone by Sahiba
          </p>
          <div className="search-and-links">
            <NavLink style={activeStyle} to="/">
              Home
            </NavLink>
            <NavLink style={activeStyle} to="/products">
              Shop
            </NavLink>
            <div className="search-bar">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "#98999a" }}
              ></i>
              <input
                placeholder="Search"
                value={filterState.search}
                onChange={(e) => {
                  filterDispatch({
                    type: "filter_by_search",
                    payload: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="nav-navigate">
            <i
              onClick={() => navigate("/cart")}
              className="fa-solid fa-cart-shopping"
            ></i>
            {cart.length > 0 && (
              <p className="badge">{token && cart.length}</p>
            )}

            <i
              onClick={() => navigate("/wishlist")}
              className="fa-solid fa-heart"
            ></i>
            {wishlist.length > 0 && (
              <p className="badge">{token && wishlist.length}</p>
            )}

            {token ? (
              <button
                className="login-icon"
                onClick={() => navigate("/profile")}
              >
                <i className="fa-regular fa-user"></i>
              </button>
            ) : (
              <button
                className="login-icon"
                onClick={() => navigate("/login")}
              >
                <i className="fa-regular fa-user"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};