import React, { Component } from 'react';
import axios from 'axios'
import '../scripts/assets/css/pagination.css'



class Productdetails extends Component {
     
   
    state = {
        name:'',
        description:'',
        price: '',
        discounted_price: '',
        image: '',
        image_2: '',
        thumbnail : '',
        display : '',
        user_key: window.localStorage.getItem('user_key')
    }




    getProductDetails = ()=>{

        const product_id  = this.props.match.params.product_id  
   
        axios.get('http://www.tshirtshop.local/products/'+product_id).then(res=>{  
            this.setState(
                {
                     name : res.data.name,
                     description : res.data.description,
                     price : res.data.price,
                     discounted_price : res.data.discounted_price,
                     image :res.data.image,
                     image_2: res.data.image_2,
                     thumbnail: res.data.thumbnail,
                     display : res.data.display 
                }
            )
         }
       )
    }

    componentDidMount(){
        this.getProductDetails();

        console.log(this.state.user_key);
        
    }

    render(){
   
    return (

    <div className=" single-product full-width extended">

    <div id="content" className="site-content" tabIndex="-1">
    <div className="container">

        <div id="primary" className="content-area">
            <main id="main" className="site-main">
                <div className="product">
                    <div className="single-product-wrapper">
                        <div className="product-images-wrapper">
                            <span className="onsale">Sale!</span>
                            <div className="images electro-gallery">
                                <div className="thumbnails-single owl-carousel">
                                    <a href={'/product_images/'+this.state.image}  className="zoom" title="" data-rel="prettyPhoto[product-gallery]"><img src={'product_images/'+this.state.image}  data-echo={'/product_images/'+this.state.image}  className="wp-post-image" alt=""/></a>
                                </div>

                                <div className="thumbnails-all columns-5 owl-carousel">
                                    <a href={'/product_images/'+this.state.image}  className="first" title=""><img src={'/product_images/'+this.state.image}  data-echo={'/product_images/'+this.state.image}  className="wp-post-image" alt=""/></a>
                                    <a href={'/product_images/'+this.state.image_2}  className="" title=""><img src={'/product_images/'+this.state.image_2}  data-echo={'/product_images/'+this.state.image_2}  className="wp-post-image" alt=""/></a>
                                </div>
                            </div>
                        </div>

                        <div className="summary entry-summary">
                         
                            <h1 itemProp="name" className="product_title entry-title">{this.state.name}</h1>

                            <div className="woocommerce-product-rating" itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                                <div className="star-rating" title="Rated 4.33 out of 5">
                                    <span><strong itemProp="ratingValue" className="rating">4.33</strong> out of<span itemProp="bestRating">5</span>based on<span itemProp="ratingCount" className="rating">3</span> customer ratings</span>
                                </div>
                                <a href="#reviews" className="woocommerce-review-link" rel="nofollow">(<span itemProp="reviewCount" className="count">3</span> customer reviews)</a>
                            </div>

        

                            <div itemProp="description">
                            
                                <p>{this.state.description}</p>
                               
                            </div>

                        </div>
                        <div className="product-actions-wrapper">
                            <div className="product-actions">
                                <div className="availability in-stock">Availablity: <span>In stock</span></div>

                                <div itemProp="offers">

                                    <p className="price">
                                        <span className="electro-price"><del><span className="amount">&#36;{this.state.discounted_price}</span></del> <ins>
                                        <span className="amount">&#36;{this.state.price}</span></ins></span>
                                    </p>

                                </div>

                                <form className="variations_form cart" method="post">

                                    <table className="variations">
                                        <tbody>
                                            <tr>
                                                <td className="label"><label htmlFor="pa_color">Color</label></td>
                                                <td className="value">
                                                    <select id="pa_color" className="" name="attribute_pa_color"
                                                     data-attribute_name="attribute_pa_color">
                                                     <option> Choose an option</option>
                                                     <option>Black with Red</option>
                                                     <option>White with Gold</option>
                                                     </select>
                                                      <a className="reset_variations" href="#clear">Clear</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="single_variation_wrap">
                                        <div className="woocommerce-variation single_variation"></div>
                                        <div className="woocommerce-variation-add-to-cart variations_button">
                                            <div className="quantity">
                                                <label>Quantity:</label>
                                                <input type="number" name="quantity" value="1" title="Qty" className="input-text qty text"/>
                                            </div>
                                            <button type="submit" className="single_add_to_cart_button button alt">Add to cart</button>
                                            <input type="hidden" name="add-to-cart" value="2439" />
                                            <input type="hidden" name="product_id" value="2439" />
                                            <input type="hidden" name="variation_id" className="variation_id" value="0" />
                                        </div>
                                    </div>
                                </form>

                                <div className="action-buttons">
                                    <a href="http://transvelo.github.io/electro/product/ultra-wireless-s50-headphones-s50-with-bluetooth/?add_to_wishlist=2439" rel="nofollow" className="add_to_wishlist" > Wishlist</a>
                                    <a href="http://transvelo.github.io/electro/product/ultra-wireless-s50-headphones-s50-with-bluetooth/?action=yith-woocompare-add-product&amp;id=2439" className="add-to-compare-link" data-product_id="2439">Compare</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>

                </main>

            </div>

            </div>

            </div>

            </div>
       )
    }
}


export default Productdetails
