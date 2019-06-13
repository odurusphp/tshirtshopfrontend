import React from 'react';


const Header = ()=>(
    <div>
            <div className="top-bar hidden-md-down">
                <div className="container">
                    <nav>
                        <ul id="menu-top-bar-left" className="nav nav-inline pull-left animate-dropdown flip">
                            <li className="menu-item animate-dropdown"><a title="Welcome to Worldwide Electronics Store" href="link">Welcome to Worldwide Electronics Store</a></li>
                        </ul>
                    </nav>

                    <nav>
                        <ul id="menu-top-bar-right" className="nav nav-inline pull-right animate-dropdown flip">
            
                            <li className="menu-item animate-dropdown"><a title="My Account" href="my-account.html"><i className="ec ec-user"></i>My Account</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div id="masthead" className="site-header header-v2">
                <div className="container hidden-md-down">
                    <div className="row">
                        <div>
                         <h3>TURING E-COMMERCE APP</h3>
                        </div>
                     

                    </div>
                </div>
            </div>
            </div>
          
)

export default Header