import React, { Component } from 'react';
import axios from  'axios';


class  Header extends Component {
     
    state = {
        user_key: window.localStorage.getItem('user_key') ,
        customer_id: '',
        name: '',
        email : '',

    }



    getUserCredentials = ()=>{
    
        const config = {
            headers:{
                Authorization:this.state.user_key
            }  
        }

        
        axios.get('/customer', config )
        .then(res=>{
        
            this.setState(
                {
                customer_id : res.data.customer_id,
                name : res.data.name,
                email: res.data.email 
                }
            )
        })

    }


    
    componentDidMount(){
        this.getUserCredentials();
    }
    

    render(){
        //alert(this.state.user_key)
       
        return(

        <div>
            <div className="top-bar hidden-md-down">
                <div className="container">
                    <nav>
                        <ul id="menu-top-bar-left" className="nav nav-inline pull-left animate-dropdown flip">
                            <li className="menu-item animate-dropdown"><a title="Welcome to Worldwide Electronics Store" href="link">Welcome to Turing E-Commerce</a></li>
                        </ul>
                    </nav>

                    <nav>
                        <ul id="menu-top-bar-right" className="nav nav-inline pull-right animate-dropdown flip">
            
                        {this.state.user_key ==='' && <li className="menu-item animate-dropdown"><a title="My Account" href="/login"><i className="ec ec-user"></i>My Account</a></li> }   
                        </ul>
                        
                        <ul id="menu-top-bar-right" className="nav nav-inline pull-right animate-dropdown flip">
                             
                        {this.state.user_key !== '' && <li className="menu-item animate-dropdown"><a title="My Account" href="my-account.html"><i className="ec ec-user"></i>Logged in as: {this.state.name} </a></li> }
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
    }
}
          
export default Header