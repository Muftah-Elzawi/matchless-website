import React, { Fragment } from "react";
import { ReactComponent as Logo } from "../../assets/pijama.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
//redux related
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "./header.styles.scss";

const Header = ({
  auth: { isAuthenticated, loading },
  logout,
  cart: { hidden }
}) => {
  const authLinks = (
    <div className="options">
      <Link className="option" to="/section">
        { " " }
        SHOP{ " " }
      </Link>
      <Link className="option" to="/contact">
        { " " }
        CONTACT
      </Link>
      <Link onClick={ logout } className="option" to="/signin">
        { " " }
        LOGOUT{ " " }
      </Link>
      <CartIcon />
    </div>
  );
  const guestLinks = (
    <div className="options">
      <Link className="option" to="/section">
        { " " }
        SHOP{ " " }
      </Link>
      <Link className="option" to="/contact">
        { " " }
        CONTACT
      </Link>
      <Link className="option" to="/signin">
        { " " }
        SIGN IN{ " " }
      </Link>
      <Link className="option" to="/signup">
        { " " }
        SIGN UP{ " " }
      </Link>
      <CartIcon />
    </div>
  );

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo height="70px" width="70px" className="logo" />
      </Link>


      {/* <SearchPage /> */}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
      {hidden ? null : <CartDropDown />}

    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(mapStateToProps, { logout })(Header);