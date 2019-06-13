import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Mainpage from '../pages/Mainpage'
import Login from '../pages/Login'
import Productdetails from '../pages/Productdetails'
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'


const pageNotFound = ()=>(
  <div>
    <p>404 - <Link to='/'>Go to Home</Link></p>
  </div>
)


const AppRouter = ()=> (
    <BrowserRouter>
    <div>
    <Header/>
    <Switch>
      <Route path='/' component={Mainpage} exact={true} />
      <Route path='/login' component={Login} />
      <Route path='/productdetails/:product_id' component={Productdetails} />
      <Route  component={pageNotFound} />

    </Switch>
    <Footer/>
    </div>
    </BrowserRouter>
  )

  export default AppRouter