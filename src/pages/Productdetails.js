import React, { Component } from 'react';
import axios from 'axios'
import '../scripts/assets/css/pagination.css'
import { Redirect } from 'react-router-dom'



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
        user_key: window.localStorage.getItem('user_key'),
        attributes : [], 
        color : '',
        size: '',
        cart_id: window.localStorage.getItem('cart_id'),
        redirect: false,

    }

    getProductDetails = ()=>{

        const product_id  = this.props.match.params.product_id  
   
        axios.get('/products/'+product_id).then(res=>{  
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

    handlechange(e) {
        this.setState({[e.target.name]: e.target.value});
      }


   

    async productAttributes() {
        const product_id  = this.props.match.params.product_id 
      
        axios.get('/attributes/inProduct/'+product_id).then(res=>{
            this.setState({ attributes : res.data })
        })
      
     } 

     async getCartUniqueId() {
        return await axios.get('/shoppingcart/generateUniqueId');
      }
      
    
      saveCart=(e)=> {
        e.preventDefault();
        let jd = this.getCartUniqueId();
        jd.then(response => {
           this.prepareCart(response.data.cart_id)
        });
     }


      prepareCart(cart_id){
       
        var bodyFormData = new FormData();
        const storedcartid = this.state.cart_id === '' ? cart_id : this.state.cart_id ;
        
        bodyFormData.append('cart_id', storedcartid);
        bodyFormData.append('product_id', this.props.match.params.product_id);
        bodyFormData.append('attributes', this.state.size + ', ' +  this.state.color);
        
        axios.post('/shoppingcart/add', bodyFormData)
        .then(res=>{
             if(res.data.error){          
               alert('Error adding cart');
             }else{
                window.localStorage.setItem('cart_id', storedcartid) 
                this.setState({ redirect : true })
                alert('Product sucessfully added to cart');
             }

           
        })
    }

    componentDidMount(){
        this.getProductDetails(); 
        this.productAttributes();
        
    }

    render(){

        const  { redirect } = this.state;
        
        if (redirect) {
           return <Redirect to='/' />;
         }

     
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

                                <form className="variations_form cart" onSubmit={ (e)=>{ this.saveCart(e)}  }>

                                    <table className="variations">
                                        <tbody>
                                            <tr>
                                                <td className="value">Color</td>
                                                <td className="value">
                                                    <select id="pa_color" name="color"
                                                     data-attribute_name="attribute_pa_color" value={this.state.color} 
                                                     onChange={(e)=>{ this.handlechange(e) } } >
                                                     { this.state.attributes.map(att=> (
                                                         <option>{ att.attribute_name === 'Color' && att.attribute_value  } </option>))  }
                                                     </select>
                                                      
                                                </td>
                                            </tr>

                                            <tr>
                                            <td className="value">Size</td>
                                            <td className="value">
                                                <select id="pa_color" name="size"
                                                 data-attribute_name="attribute_pa_color" value={this.state.size} 
                                                 onChange={(e)=>{ this.handlechange(e) } } >
                                                 { this.state.attributes.map(att=> (
                                                     <option>{ att.attribute_name === 'Size' && att.attribute_value  } </option>))  }
                                                 </select>
                                                  
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <div className="single_variation_wrap">
                                        <div className="woocommerce-variation single_variation"></div>
                                        <div className="woocommerce-variation-add-to-cart variations_button">
                            
                                            <button type="submit" className="single_add_to_cart_button button alt">Add to cart</button>
                                           
                                        </div>
                                    </div>
                                </form>
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
