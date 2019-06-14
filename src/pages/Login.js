import React,  {Component} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'



class Login extends Component{

    state = {
        username : '',
        userpassword:  '',
        name  : '',
        password: '',
        email : '',
        redirect : false,
        errorMessage: '',
        errorCode:''
    }



    handlechange(e) {
        this.setState({[e.target.name]: e.target.value});
      }



    handleLogin(e){
      
        e.preventDefault();
        window.localStorage.setItem('user_key', '');
      
        var bodyFormData = new FormData();
        bodyFormData.append('email', this.state.username);
        bodyFormData.append('password', this.state.userpassword);

        axios.post('/customers/login', bodyFormData)
        .then(res=>{
        
             if(res.data.error){
                window.localStorage.setItem('user_key', '');
                this.setState({
                    errorMessage: res.data.error.message,
                    errorCode: res.data.error.code,
                    redirect : false
                })
             }else{
                window.localStorage.setItem('user_key', res.data.accessToken);
                this.setState({ redirect : true })
             }

           
        })
    }


    componentDidMount(){
      
    }

    render(){

        const  { redirect } = this.state;
        
         if (redirect) {
            return <Redirect to='/' />;
          }

        return(
    
    <div className=" single-product full-width extended">
    <div id="page" className="hfeed site">
    <div id="content" className="site-content" tabIndex="-1">
    <div className="container">

        <div id="primary" className="content-area">
            <main id="main" className="site-main">
                <article id="post-8" className="hentry">

                    <div className="entry-content">
                        <div className="woocommerce">
                            <div className="customer-login-form">
                                

                                <div className="col2-set">

                                    <div className="col-1">

                                        <h2>Login</h2>

                                        <form  className="login" onSubmit={ (e)=>{ this.handleLogin(e)}  } >

                                            <p className="error-text">{ this.state.errorMessage }</p>

                                            <p className="form-row form-row-wide">
                                                <label htmlFor="username">Username or email address<span className="required">*</span></label>
                                                <input type="text" className="input-text" name="username" id="username" 
                                                 value = {this.state.username}  onChange={(e)=>{ this.handlechange(e) } }  />
                                            </p>

                                            <p className="form-row form-row-wide">
                                                <label htmlFor="userpassword">Password<span className="required">*</span></label>
                                                <input className="input-text" type="password" name="userpassword" id="userpassword" 
                                                value = {this.state.userpassword}  onChange={(e)=>{ this.handlechange(e) } } />
                                            </p>

                                            <p className="form-row">
                                                <input className="button" type="submit" value="Login" name="login" />
                                                
                                            </p>

                                        </form>


                                    </div>

                                 

                                </div>

                            </div>
                        </div>
                    </div>

                </article>

            </main>
        </div>

    </div>
</div>
</div>
</div>
    
)
        }
    }


export default Login
