import React , { Component } from 'react'


 class Categories extends Component {

    
    

    render(){

       console.log(this.props.categorydata) 

     return(
         <div>
               { this.props.categorydata.length > 0 && (
               <ul className="product-categories category-single">
                  
                    <li className="product_cat">
                        <ul className="show-all-cat">
                            <li className="product_cat"><span className="show-all-cat-dropdown">Categories</span></li>
                               </ul>
                                    <ul>
                                       
                                        <ul className='children'>
                                        {this.props.categorydata.map(category=>(
                                            <li className="cat-item" key={category.category_id}><a href="departments"> {category.name}</a> </li>
                                           )) }
            
                                            
                                        </ul>
                                    </ul>
                                </li>
                            </ul>
               )}
                    </div>
)
  }
}

export default Categories