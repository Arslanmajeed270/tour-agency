import React, { Component } from 'react';
import { Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import { logoutAgency, getAgency  } from './store/auth/actions';
import jwt_decode from 'jwt-decode'

import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Index from './pages';

class App extends Component {

  state = {
    privateRoutes: [
      {
        path:"/dashboard",
        active: "Dashboard" 
      },
      {
        path:"/list-tours",
        active: "List Tours" 
      },
      {
        path:"/edit-tour",
        active: "Edit Tour" 
      },
      {
        path:"/new-tour",
        active: "New Tour" 
      },
      {
        path:"/list-products",
        active: "List Products" 
      },
      {
        path:"/edit-product",
        active: "Edit Product" 
      },
      {
        path:"/new-product",
        active: "New Product" 
      }
    ],
    publicRoutes: [
      "/login",
      "/register"
    ]
  }

  render() {
    const { onLogoutAgency, onGetAgency } = this.props;
    const { privateRoutes, publicRoutes } = this.state;
  
    const jwtToken = localStorage.jwtToken; 

    if ( jwtToken ) {
      const decoded = jwt_decode( JSON.parse(jwtToken));
      setAuthToken(jwtToken);
      onGetAgency(decoded.id);  
      const currentTime = Date.now()/1000;

      if (decoded.exp < currentTime) {
        onLogoutAgency();
          // window.location.href = '/login';
      }
  }
  
    const routes = (
      <Switch>
          { privateRoutes.map( (route, index) => (
              <PrivateRoute
                exact
                key={index} 
                path={route.path}
                component={(props) => <Index active={route.active} {...props} />} />
            )) 
          }
          { publicRoutes.map( (route, index) => (
              <PublicRoute
                exact
                key={index} 
                path={route}
                component={(props) => route === "/login" ?  <Login {...props} /> : <Register {...props} /> } />
            )) 
          }
            <Redirect to={"/dashboard"} />
        </Switch>
    );
    return (
      <div className="app" style={{height: "100%"}}>
            {routes}
      </div>
    )
  }
}



const mapDispatchToProps = dispatch => {
  return {
    onLogoutAgency: () => dispatch(logoutAgency()),
    onGetAgency: (id) => dispatch(getAgency(id)),
  };
};


export default withRouter(connect(null,mapDispatchToProps)(App));