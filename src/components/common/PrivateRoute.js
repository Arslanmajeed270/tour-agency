import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    let isAuthenticated = false;
    if( auth.isAuthenticated ){
        isAuthenticated = true;
    }else{
        const jwtToken = localStorage.jwtToken; 

        if ( jwtToken ) {
          const currentTime = Date.now()/1000;
          const decoded = jwt_decode( JSON.parse(jwtToken));
          if (decoded.exp > currentTime) {
              isAuthenticated = true;
          }
    }
    }
    return <Route
    {...rest}
    render={
        props => isAuthenticated === true ? (
            <Component {...props} />
        ) : (
            <Redirect to={"/login"} />
        )
    }
    />
};


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);