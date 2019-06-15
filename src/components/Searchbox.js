import React, {Component} from 'react';
import axios from  'axios';


 class  Searchbox extends Component {

    state = {
        cart_id : window.localStorage.getItem('cart_id'),
        cart_items : [],
        total_amount : ''
    }

    listcartitems=()=>{
        axios.get('/shoppingcart/'+this.state.cart_id).then(res=>{  
            console.log(res.data)
            this.setState(
                { cart_items : res.data}
            )
         }
       )
    }

    totalCartAmount = ()=>{
        axios.get('/shoppingcart/totalAmount/'+this.state.cart_id).then(res=>{
            this.setState({ total_amount: res.data.total_amount })
        })
    }

    componentDidMount(){
        this.listcartitems();
        this.totalCartAmount();
    }

    render(){

        return(
    <div>
        <nav className="navbar navbar-primary navbar-full hidden-md-down">
                    <div className="container">
                        <ul className="nav navbar-nav departments-menu animate-dropdown">
                            <li className="nav-item dropdown ">

                             <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#anchor" id="departments-menu-toggle" >
                                Turing E-commerce</a>     
                            </li>
                        </ul>
                        <form className="navbar-search" >
                            <label className="sr-only screen-reader-text">Search for:</label>
                            <div className="input-group">
                                <input type="text" id="search" className="form-control search-field" dir="ltr"  placeholder="Search for products" />
                                <div className="input-group-addon search-categories">
                                    
                                </div>
                                <div className="input-group-btn">
                        
                                    <button type="submit" className="btn btn-secondary"><i className="ec ec-search"></i></button>
                                </div>
                            </div>
                        </form>

                        <ul className="navbar-mini-cart navbar-nav animate-dropdown nav pull-right flip">
                        <li className="nav-item dropdown">
                            <a href="cart.html" className="nav-link" data-toggle="dropdown">
                                <i className="ec ec-shopping-bag"></i>
                                <span className="cart-items-count count">{this.state.cart_items.length }</span>
                                <span className="cart-items-total-price total-price"><span className="amount">&#36;{this.state.total_amount}</span></span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-mini-cart">
                                <li>
                                    <div className="widget_shopping_cart_content">

                                        <ul className="cart_list product_list_widget ">
                                          
                                        {this.state.cart_items.map(cat=>(
                                            <li className="mini_cart_item">
                                                <a  className="remove" href="#remove">×</a>
                                                <a href="single-product.html">
                                                    <img className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" src={'product_images/'+cat.image} alt="" />{cat.name}&nbsp;
                                                </a>

                                                <span className="quantity">{cat.quantity} × <span className="amount">{cat.price}</span></span>
                                            </li>
                                        ))}
                                        </ul>


                                        <p className="total"><strong>Subtotal:</strong> <span className="amount">£969.98</span></p>


                                        <p className="buttons">
                                            <a className="button wc-forward" href="/cart">View Cart</a>
                                            <a className="button checkout wc-forward" href="/cart">Checkout</a>
                                        </p>

                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    </div>
        </nav>
    </div>
)
        }
    }

export default Searchbox