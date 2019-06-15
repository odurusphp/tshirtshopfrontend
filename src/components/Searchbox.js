import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { stat } from "fs";

class Searchbox extends Component {
  state = {
    cart_id: window.localStorage.getItem("cart_id"),
    cart_items: [],
    search: ''
  };

  listcartitems = () => {
    axios.get("/shoppingcart/" + this.state.cart_id).then(res => {
      console.log(res.data);
      this.setState({ cart_items: res.data });
    });
  };

  onKeyChange = (e)=> {
    this.setState({search: e.target.value});
  }

 handleSubmit = (e)=>{
     e.preventDefault();
     axios
       .get(`https://backendapi.turing.com/products/search?query_string=${this.state.search}&all_words=on&limit=${this.props.perPage}`
       )
       .then(res => {
         this.props.onFetchProducts(res.data);
       });
 }

  componentDidMount() {
    this.listcartitems();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-primary navbar-full hidden-md-down">
          <div className="container">
            <ul className="nav navbar-nav departments-menu animate-dropdown">
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#anchor"
                  id="departments-menu-toggle"
                >
                  Turing E-commerce
                </a>
              </li>
            </ul>
            <form className="navbar-search" onSubmit={this.handleSubmit}>
              <label className="sr-only screen-reader-text">
                Search for:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="search"
                  className="form-control search-field"
                  dir="ltr"
                  placeholder="Search for products"
                  onChange={this.onKeyChange}
                />
                <div className="input-group-addon search-categories" />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-secondary">
                    <i className="ec ec-search" />
                  </button>
                </div>
              </div>
            </form>

            <ul className="navbar-mini-cart navbar-nav animate-dropdown nav pull-right flip">
              <li className="nav-item dropdown">
                <a
                  href="cart.html"
                  className="nav-link"
                  data-toggle="dropdown"
                >
                  <i className="ec ec-shopping-bag" />
                  <span className="cart-items-count count">
                    {this.state.cart_items.length}
                  </span>
                  <span className="cart-items-total-price total-price">
                    <span className="amount">&#36;1,215.00</span>
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-mini-cart">
                  <li>
                    <div className="widget_shopping_cart_content">
                      <ul className="cart_list product_list_widget ">
                        <li className="mini_cart_item">
                          <a
                            title="Remove this item"
                            className="remove"
                            href="#"
                          >
                            ×
                          </a>
                          <a href="single-product.html">
                            <img
                              className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                              src="assets/images/products/mini-cart1.jpg"
                              alt=""
                            />
                            White lumia 9001&nbsp;
                          </a>

                          <span className="quantity">
                            2 × <span className="amount">£150.00</span>
                          </span>
                        </li>
                      </ul>

                      <p className="total">
                        <strong>Subtotal:</strong>{" "}
                        <span className="amount">£969.98</span>
                      </p>

                      <p className="buttons">
                        <a className="button wc-forward" href="cart.html">
                          View Cart
                        </a>
                        <a
                          className="button checkout wc-forward"
                          href="checkout.html"
                        >
                          Checkout
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}


let mapStateToProps = (state) => {
    return {
        perPage: state.perPage
    }
}

let mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: data => {
      const action = { type: "SEARCH_RESULTS", payload: data };
      dispatch(action);
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Searchbox);
