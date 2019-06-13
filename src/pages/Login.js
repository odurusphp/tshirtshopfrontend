import React,  {Component} from 'react';
import axios from 'axios'


class Login extends Component{

    state = {
        username : '',
        userpassword:  '',
        name  : '',
        password: '',
        email : '',

    }

    // handlechange(e) {
    //     this.setState({name: e.target.value});
    // }

    handlechange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

     handleSubmit(e){
      
        e.preventDefault();
      
        var bodyFormData = new FormData();
        bodyFormData.append('name', this.state.name);
        bodyFormData.append('email', this.state.email);
        bodyFormData.append('password', this.state.password);

        axios.post('/customers', bodyFormData)
        .then(res=>{
            window.localStorage.setItem('user_key', res.data.accessToken);
        })
    }


    componentDidMount(){
      
    }

    render(){

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
                                <span className="or-text">or</span>

                                <div className="col2-set" id="customer_login">

                                    <div className="col-1">

                                        <h2>Login</h2>

                                        <form  className="login"  >

                                            <p className="before-login-text">Welcome back! Sign in to your account</p>

                                            <p className="form-row form-row-wide">
                                                <label htmlFor="username">Username or email address<span className="required">*</span></label>
                                                <input type="text" className="input-text" name="username" id="username"  />
                                            </p>

                                            <p className="form-row form-row-wide">
                                                <label htmlFor="userpassword">Password<span className="required">*</span></label>
                                                <input className="input-text" type="password" name="userpassword" id="userpassword" />
                                            </p>

                                            <p className="form-row">
                                                <input className="button" type="submit" value="Login" name="login" />
                                                
                                            </p>

                                        </form>


                                    </div>

                                    <div className="col-2">

                                        <h2>Register</h2>

                                        <form  className="register" onSubmit={ (e)=>{ this.handleSubmit(e)}  } >

                                            <p className="before-register-text">Create your very own account</p>

                                            <p className="form-row form-row-wide">
                                                <label htmlFor="name">Name<span className="required">*</span></label>
                                                <input type="text" className="input-text" name="name" id="name" 
                                                 value={this.state.name} 
                                                 onChange={(e)=>{ this.handlechange(e) } }  />
                                            </p>

                                            <p className="form-row form-row-wide">
                                                <label htmlFor="email">Email address<span className="required">*</span></label>
                                                <input type="email" className="input-text" name="email" id="email" 
                                                 value={this.state.email} 
                                                 onChange={(e)=>{ this.handlechange(e) } }
                                                />
                                            </p>

                                            <p className="form-row form-row-wide">
                                                <label htmlFor="password">Password<span className="required">*</span></label>
                                                <input type="password" className="input-text" name="password" id="password"
                                                  value={this.state.password} 
                                                  onChange={(e)=>{ this.handlechange(e) } } />
                                            </p>

                                            <p className="form-row"><input type="submit" className="button" name="register" value="Register" /></p>


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
