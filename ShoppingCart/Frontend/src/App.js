import React from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProtectedRoute from "./ProtectedRoute";

import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import RoleSelector from "./Components/RoleSelector";
import Item from "./Components/Item";
import Customer from "./Components/Customer";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import AboutUs from "./Components/AboutUs";

export default function App() {
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");

  if(role === 'trader'){
    return (
    <Router>
      <Switch>
          <Route exact path='/login/:role' component={Login}/>
          <Route exact path='/' component={RoleSelector}/>

          <ProtectedRoute exact path='/home' component={Home} auth={isAuth}/>
          <ProtectedRoute exact path='/item' component={Item} auth={isAuth}/>
          <ProtectedRoute exact path='/customer' component={Customer} auth={isAuth}/>
          <ProtectedRoute exact path='/aboutus' component={AboutUs} auth={isAuth}/>
      </Switch>
    </Router>
  );
}else{
    return (
      <Router>
        <Switch>
            <Route exact path='/login/:role' component={Login}/>
            <Route exact path='/' component={RoleSelector}/>

            <ProtectedRoute exact path='/home' component={Home} auth={isAuth}/>
            <ProtectedRoute exact path='/item' component={Item} auth={isAuth}/>
            <ProtectedRoute exact path='/wishlist' component={Wishlist} auth={isAuth}/>
            <ProtectedRoute exact path='/cart' component={Cart} auth={isAuth}/>
            <ProtectedRoute exact path='/aboutus' component={AboutUs} auth={isAuth}/>
        </Switch>
      </Router>
    );
}
}
