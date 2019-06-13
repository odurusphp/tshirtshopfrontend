import React from 'react';

 const  Searchbox = ()=>(
    <div>
        <nav className="navbar navbar-primary navbar-full hidden-md-down">
                    <div className="container">
                        <ul className="nav navbar-nav departments-menu animate-dropdown">
                            <li className="nav-item dropdown ">

                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#anchor" id="departments-menu-toggle" >
                                Electron E-commerce</a>
                                
                            </li>
                        </ul>
                        <form className="navbar-search" >
                            <label className="sr-only screen-reader-text" for="search">Search for:</label>
                            <div className="input-group">
                                <input type="text" id="search" className="form-control search-field" dir="ltr" value="" name="s" placeholder="Search for products" />
                                <div className="input-group-addon search-categories">
                                    
                                </div>
                                <div className="input-group-btn">
                                    <input type="hidden" id="search-param" name="post_type" value="product" />
                                    <button type="submit" className="btn btn-secondary"><i className="ec ec-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
        </nav>
    </div>
)

export default Searchbox