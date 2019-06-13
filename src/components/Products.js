import React, { Component } from "react";
import Departments from "./Departments";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default class Products extends Component {
  state = {
    products: [],
    departments: [],
    currentPage: 1,
    perPage: 6
  };

  listproducts = () => {
    axios.get(`/products?page=${this.state.currentPage}&limit=${this.state.perPage}`).then(res => {
      this.setState({ products: res.data.row });
      this.setState({ pageCount: res.data.count / this.state.perPage })
    });
  };

  listdepartments = () => {
    axios.get("/departments").then(res => {
      this.setState({ departments: res.data });
    });
  };

  handlePageClick = data => {
    let selected = data.selected;
    this.setState({ currentPage: selected + 1 }, () => {
      this.listproducts();
    });
  };

  componentDidMount() {
    this.listproducts();
    this.listdepartments();
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
                    id="grid-extended"
                    aria-expanded="true"
                  >
                    <ul className="products columns-3">
                      {this.state.products.map(products => (
                        <li className="product" key={products.product_id}>
                          <div className="product-outer">
                            <div className="product-inner">
                              <span className="loop-product-categories">
                                <a href="product-category.html" rel="tag">
                                  Smartphones
                                </a>
                              </span>
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
                                <a
                                  rel="nofollow"
                                  href={
                                    "/productdetails/" + products.product_id
                                  }
                                  className="button add_to_cart_button"
                                >
                                  Add to cart
                                </a>
                              </div>

                              <div className="hover-area">
                                <div className="action-buttons">
                                  <a
                                    href="#wishlist"
                                    rel="nofollow"
                                    className="add_to_wishlist"
                                  >
                                    Wishlist
                                  </a>
                                  <a
                                    href="#compare"
                                    className="add-to-compare-link"
                                  >
                                    Compare
                                  </a>
                                </div>
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

          <ReactPaginate
            previousLabel={"prev."}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.perPage}
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
