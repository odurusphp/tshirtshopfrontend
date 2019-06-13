import React , { Component } from 'react'
import Categories from './Categories'
import axios from 'axios'


 class Departments extends Component {
   
    state = {
        categories:[]
    }
    
    getCategories=(departmentid)=>{
        axios.get('http://www.tshirtshop.local/categories/indepartment/'+ departmentid).then(res=>{  
            console.log(res.data)
            this.setState(
                { categories : res.data}
            )
         }
       )
    }

    render(){


     return(
        
    <div id="sidebar" className="sidebar" role="complementary">
                        <aside className="widget woocommerce widget_product_categories electro_widget_product_categories">
                        
                            <ul className="product-categories category-single">
                                <li className="product_cat">
                                    <ul className="show-all-cat">
                                        <li className="product_cat"><span className="show-all-cat-dropdown">DEPARTMENTS</span></li>
                                    </ul>
                                    <ul>
                                       
                                            <ul className='children'>
                                               {this.props.departmentdata.map(department=>(
                                                <li className="cat-item" key={department.department_id}><a href="departments" 
                                                onClick={
                                                    (e)=>{
                                                    e.preventDefault();
                                                    this.getCategories(department.department_id)
                                                    }
                                                } >{department.name}</a> </li>
                                               )) }
                
                                            </ul>
                                    </ul>
                                </li>
                            </ul>

                             <Categories categorydata = {this.state.categories} />
                        </aside>
                        
                  
                    </div>
)
                                               }
                                            }

export default Departments