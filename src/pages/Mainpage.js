import React from 'react';
import Products from '../components/Products';
import Searchbox from  '../components/Searchbox';
import store from "../store";

const  Mainpage =()=>(
    <div>
        <div id="page" className="hfeed site">
           <Searchbox store={store} />
           <Products store={store} />
       
        </div>
    </div>
    
)


export default Mainpage
