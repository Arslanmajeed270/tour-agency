import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, auth, ...rest }) => (

    <Route

    {...rest}
    render={
        props => auth.isAuthenticated === false ? (
            <Component {...props} />
        ) : (
            <Redirect to={"/dashboard"} />
        )
    }
    />
);


PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);