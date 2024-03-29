import React, { Component } from "react";
import Departments from "./Departments";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { connect } from 'react-redux';
import { stat } from "fs";


class Products extends Component {
  constructor() {
    super();
    
  }
  
  state = {
    departments: [],
    currentPage: 1,
    cart_id: window.localStorage.getItem("cart_id"),
    cart_items: [],
    perPage: 6
  };

  listproducts = () => {
    axios.get(`/products?page=${this.state.currentPage}&limit=${this.props.perPage}`).then(res => {
      this.props.onFetchProducts(res.data);
    });
  };

  listdepartments = () => {
    axios.get("/departments").then(res => {
      this.setState({ departments: res.data });
    });
  };

  listcartitems = () => {
    axios.get("/shoppingcart/" + this.state.cart_id).then(res => {
      console.log(res.data);
      this.setState({ cart_items: res.data });
    });
  };

  handlePageClick = data => {
    this.setState({ currentPage: data.selected + 1 }, () => {
      this.listproducts();
    });
  };

  componentDidMount() {
    this.listproducts();
    this.listdepartments();
    this.listcartitems();
  }

  render() {
    return (
      <div>
        <br />
        <div id="content" className="site-content">
          <div className="container">
            <div id="primary" className="content-area">
              <main id="main" className="site-main">
                <header className="page-header">
                  <h1 className="page-title">Product Listing</h1>
                  <p className="woocommerce-result-count">
                    Showing 1&ndash;15 of 20 results
                  </p>
                </header>
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    className="tab-pane active"
                    id="grid"
                    aria-expanded="true"
                  >
                    <ul className="products columns-3">
                      {this.props.products.map(products => (
                        <li className="product" key={products.product_id}>
                          <div className="product-outer">
                            <div className="product-inner">
                              <a
                                href={"/productdetails/" + products.product_id}
                              >
                                <h3>{products.name} </h3>
                                <div className="product-thumbnail">
                                  <img
                                    data-echo={
                                      "product_images/" + products.thumbnail
                                    }
                                    src={"product_images/" + products.thumbnail}
                                    alt=""
                                  />
                                  <div>{products.description}</div>
                                </div>
                              </a>

                              <div className="price-add-to-cart">
                                <span className="price">
                                  <span className="electro-price">
                                    <ins>
                                      <span className="amount">
                                        &#036;{products.discounted_price}
                                      </span>
                                    </ins>
                                    <del>
                                      <span className="amount">
                                        &#036;{products.price}
                                      </span>
                                    </del>
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    role="tabpanel"
                    className="tab-pane"
                    id="grid-extended"
                    aria-expanded="true"
                  />

                  <div
                    role="tabpanel"
                    className="tab-pane"
                    id="list-view"
                    aria-expanded="true"
                  />

                  <div
                    role="tabpanel"
                    className="tab-pane"
                    id="list-view-small"
                    aria-expanded="true"
                  />
                </div>
              </main>
            </div>

            <Departments departmentdata={this.state.departments} />
          </div>
          {this.props.search}
          <ReactPaginate
            previousLabel={"prev."}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.props.count}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"page pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    products: state.products,
    count: state.count,
    perPage: state.perPage
  }
}

let mapDispatchToProps = (dispatch)=>{
  return {
    onFetchProducts: (data) => {
      const action = { type: 'ADDPRODUCTS', payload: data };
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);