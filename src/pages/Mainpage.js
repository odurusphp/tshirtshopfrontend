import React from 'react';
import Products from '../components/Products';
import Searchbox from  '../components/Searchbox';


const  Mainpage =()=>(
    <div>
        <div id="page" className="hfeed site">
           <Searchbox />
           <Products />
       
        </div>
    </div>
    
)


export default Mainpage
