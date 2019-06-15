import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Mainpage from '../pages/Mainpage'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Productdetails from '../pages/Productdetails'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'


const pageNotFound = ()=>(
  <div>
    <p>404 - <Link to='/'>Go to Home</Link></p>
  </div>
)


const AppRouter = ()=> (
    <Router>
    <div>
    <Header/>
    <Switch>
      <Route path='/' component={Mainpage} exact={true} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/cart' component={Cart} />
      <Route path='/productdetails/:product_id' component={Productdetails} />
      <Route  component={pageNotFound} />

    </Switch>
    <Footer/>
    </div>
    </Router>
  )

  export default AppRouter