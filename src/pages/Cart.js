import  React, { Component } from 'react'
import axios from 'axios'

class Cart extends Component {
     
    state = {
        cart_id : window.localStorage.getItem('cart_id'),
        cart_items : [],
        total_amount: '',
        quantity : []
       
    }

    handlechange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
   
    listcartitems=()=>{
        axios.get('/shoppingcart/'+this.state.cart_id).then(res=>{  
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

    deleteCartitem =(item_id)=>{

        axios.delete('/shoppingcart/removeproduct/'+item_id).then(res=>{
             this.listcartitems();
             this.totalCartAmount();
        }) 
    }
     


    componentDidMount(){
        this.listcartitems();
        this.totalCartAmount();
    }

    render(){

        return(
            <div className='page home page-template-default' >
            <div className="container">
            <div id="primary" className="content-area">
                        <main id="main" className="site-main">
                            <article className="page type-page status-publish hentry">
                                <header className="entry-header"><h1 className="entry-title">PRODUCT SHOPPING CART</h1></header>
                                <form>
                                    <table className="shop_table shop_table_responsive cart">
                                        <thead>
                                            <tr>
                                                <th className="product-remove">&nbsp;</th>
                                                <th className="product-thumbnail">&nbsp;</th>
                                                <th className="product-name">Product</th>
                                                <th className="product-name">Attributes</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        {this.state.cart_items.map(cat=>(
                                            <tr className="cart_item" key={cat.item_id}>

                                                <td className="product-remove">
                                                    <a className="remove" href="#remove"
                                                    onClick={
                                                        (e)=>{
                                                        e.preventDefault();
                                                        this.deleteCartitem(cat.item_id)
                                                           }
                                                         } > x</a> 
                                                    
                                                   
                                                </td>

                                                <td className="product-thumbnail">
                                                    <a href="#image"><img width="180" height="180" src={'product_images/'+cat.image} alt="" /></a>
                                                </td>

                                                <td data-title="Product" className="product-name">
                                                    <a href="single-product.html">{cat.name}</a>
                                                </td>

                                                <td data-title="Product" className="product-name">
                                                    <a href="single-product.html">{cat.attributes}</a>
                                                </td>

                                                <td data-title="Price" className="product-price">
                                                    <span className="amount">${cat.price}</span>
                                                </td>

                                                <td data-title="Quantity" className="product-quantity">
                                                    <div className="quantity buttons_added">
                                
                                                        <label>Quantity:</label>
                                                        <input type="number" size="4" className="input-text qty text" title="Qty"
                                                         value={cat.quantity}
                                                         name="quantity" onChange={(e)=>{ this.handlechange.bind(e) } } />
                                                      
                                                    </div>
                                                </td>

                                                <td data-title="Total" className="product-subtotal">
                                                    <span className="amount">$ {cat.price * cat.quantity }</span>
                                                </td>
                                            </tr>
                                        ))
                                        }
                                           
                                            <tr>
                                                <td className="actions" colSpan="7">

                                                    <input type="submit" value="Update Cart" name="update_cart" className="button" />

                                                    <div className="wc-proceed-to-checkout">

                                                        <a className="checkout-button button alt wc-forward" href="checkout.html">Proceed to Checkout</a>
                                                    </div>

                                                
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                                <div className="cart-collaterals">

                                    <div className="cart_totals ">

                                        <h2>Cart Totals</h2>

                                        <table className="shop_table shop_table_responsive">

                                            <tbody>
                                                <tr className="cart-subtotal">
                                                    <th>Subtotal</th>
                                                    <td data-title="Subtotal"><span className="amount">${this.state.total_amount}</span></td>
                                                </tr>

                                                <tr className="order-total">
                                                    <th>Total</th>
                                                    <td data-title="Total"><strong><span className="amount">${this.state.total_amount}</span></strong> </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="wc-proceed-to-checkout">

                                            <a className="checkout-button button alt wc-forward" href="/chechout">Proceed 
                                            to Checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </main>
                    </div>
                    </div>
                    </div>
        )
    }

}

export default Cart