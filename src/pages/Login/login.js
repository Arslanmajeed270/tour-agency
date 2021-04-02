import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { redirectDashboardIfAlreadyLogin } from '../../components/common/lib';
import{ Alert } from 'react-bootstrap';
import Spinner from '../../components/common/Spinner';
import { login } from '../../store/auth/actions';



class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {},
        loading : false
    };

    componentDidMount() {
        const { auth, history } = this.props;
        redirectDashboardIfAlreadyLogin(auth, history);
    }

    static getDerivedStateFromProps(props, state) {

        const { errors, page } = props;

        let stateChanged = false;
        let changedState = {};


        if(errors && JSON.stringify(state.errors) !== JSON.stringify(errors)){
            
            changedState.errors = errors;
            stateChanged = true;
        }

        if(page && JSON.stringify(state.loading) !== JSON.stringify(page.loading)){
            changedState.loading = page.loading;  
            stateChanged = true;
        }

        if(stateChanged){
        return changedState;
        }
        return null;
    }




    onChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }


    onSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        const { onLogin, history } = this.props;

        console.log("into onSubmit");

        const reqPacket = {
            email: email,
            password: password
        };

        onLogin( reqPacket, history );
    }

    render() {
        const { email, password, errors, loading } = this.state;
        let pageContent = '';

        if(loading){
            pageContent = <Spinner />;
        }  
        else{
            pageContent = (
                <React.Fragment>
                    {/* begin:: Page */}
                    <div className="kt-grid kt-grid--ver kt-grid--root" style={{height:"100%"}}>
                    <div className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v1" id="kt_login">
                        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
                        {/*begin::Aside*/}
                        <div className="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside" style={{backgroundImage: 'url(../assets/media//bg/bg-4.jpg)'}}>
                            <div className="kt-grid__item">
                                <Link to="/login" className="kt-login__logo">
                                    <img src="../assets/media/logos/logo-4.png"  alt="logo"/>
                                </Link>
                            </div>
                            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
                            <div className="kt-grid__item kt-grid__item--middle">
                                <h3 className="kt-login__title">Welcome to Tour Agency Panel!</h3>
                                <h4 className="kt-login__subtitle">Facility to people by &amp; Tour Company.</h4>
                            </div>
                            </div>
                            <div className="kt-grid__item">
                            <div className="kt-login__info">
                                <div className="kt-login__copyright">
                                © 2020 Tour Company
                                </div>
                            </div>
                            </div>
                        </div>
                        {/*begin::Aside*/}
                        {/*begin::Content*/}
                        <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
                            {/*begin::Body*/}
                            <div className="kt-login__body">
                            {/*begin::Signin*/}
                            <div className="kt-login__form">
                                    {errors && errors.message &&
                                <Alert variant='danger'>
                                <strong>Error!</strong> { errors.message }
                                </Alert>
                                }
                                <div className="kt-login__title">
                                <h3>Login Account</h3>
                                </div>
                                {/*begin::Form*/}
                                <form className="kt-form" id="form1" action="" method="POST" >

                                {/* {error!==null ? (
                                    <div role="alert" className="alert alert-danger">
                                        <div className="alert-text">{error}</div>
                                    </div>
                                    ) : (
                                    <div role="alert" className="alert alert-info">
                                        <div className="alert-text">
                                        Use account <strong>admin@demo.com</strong> and password{" "}
                                        <strong>demo</strong> to continue.
                                        </div>
                                    </div>
                                )} */}

                            
                                <div className="form-group">

                                    <input className="form-control"  type="text" placeholder="Email" 
                                    onChange={this.onChange} 
                                    name="email" 
                                    value={email}
                                    />

                                </div>
                                <div className="form-group">

                                    <input className="form-control" type="password" placeholder="Password" 
                                    onChange={this.onChange} 
                                    name="password"
                                    value={password}
                                    />
                                </div>
                                {/*begin::Action*/}
                                <div className="kt-login__actions">
                                    <Link to="/register" className="kt-link kt-login__link-forgot" >
                                        click here to register!
                                    </Link>

                                    <button 
                                    type="submit" 
                                    form="form1" 
                                    className="btn btn-primary btn-elevate kt-login__btn-primary" 
                                    onClick={this.onSubmit}

                                    >
                                        Sign In
                                    </button>
                                </div>
                                {/*end::Action*/}
                                </form>
                                {/*end::Form*/}
                            </div>
                            {/*end::Signin*/}
                            </div>
                            {/*end::Body*/}
                        </div>
                        {/*end::Content*/}
                        </div>
                    </div>
                    </div>
                    {/* end:: Page */}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                {pageContent}
            </React.Fragment>
            
            )
}

}



const mapStateToProps = state => {
    return {
        auth: state.auth,
        page: state.page,
        errors: state.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: ( reqPacket, history ) => dispatch(login( reqPacket, history )),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);