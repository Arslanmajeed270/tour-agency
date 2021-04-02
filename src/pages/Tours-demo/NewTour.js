import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import InputClasses from './Input.module.css';

import * as actions from '../../store/actions/index';



// import{Alert } from 'react-bootstrap';
import Spinner from '../../components/common/Spinner';


class NewCustomer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading : false,

      title:'',
      location:'',
      description: '',
      departure: new Date(),
      returning: new Date(),
      price:0,
      duration:0,
      allowedPersons: 0,
      tags: [],
      included: [{
        name: "",
        status: false,
        detail: "",
        image: ""
      }],
      plan: [],
      images: [],
      checkoutDestination: '',

      activeStep:0
      };
  }



  static getDerivedStateFromProps(props, state) {

    const {errors, page } = props;
    

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


  
  onActiveStepHandler = (current) => {
    this.setState({
      activeStep : current
    });
  }

  
 
  onChangeHandler = e => {
    const { name, value } = e.target;

		this.setState({
      [name]: value,
      errors : {...this.state.errors,[name]:''}}
    );
  }




  onSubmit = (e) => {
    e.preventDefault();

    const { title, location, description, departure, returning,
      price, duration, allowedPersons, tags, included, plan, 
      images, checkoutDestination } = this.state; 
  
    //  const formData = {
    //   email: email,
    //   name:name,
    //   contact_no: contactNo,
    //   password: password,
    //   role: role,
    //   salary: salary,
    //   dateJoined: dateJoined
    // }
  
    // this.props.onSubmit(formData, this.props.history);
  }

  render() {

    const {
      loading,
      activeStep,

      title, location, description, departure, returning,
      price, duration, allowedPersons, tags, included, plan, 
      images, checkoutDestination
       } = this.state;

    let pageContent = '';
    console.log(`checking this.state: `, this.state);

    
      if(loading){
        pageContent = <Spinner />
      }
      else{
        pageContent = '';
      }
      return (
        <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
          <div className="kt-portlet">
            <div className="kt-portlet__body kt-portlet__body--fit">
              <div className="kt-grid  kt-wizard-v1 kt-wizard-v1--white" id="kt_wizard_v1" >
                <div className="kt-grid__item">
                  {/*begin: Form Wizard Nav */}
                  <div className="kt-wizard-v1__nav">
                    <div className="kt-wizard-v1__nav-items">

                      <Link to={"#"} className={"kt-wizard-v1__nav-item"+ (activeStep>=0 ? " is_active" : '') } >
                        <div className={"kt-wizard-v1__nav-body"+(activeStep>=0 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon" + (activeStep>=0 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(0)}
                          >
                            <i className="flaticon-list" />
                          </div>
                          <div className="kt-wizard-v1__nav-label" >
                            1) Tour Information
                          </div>
                        </div>
                      </Link>

                      <div className={"kt-wizard-v1__nav-item"+ (activeStep>0 ? " is_active" : '')}  >
                        <div className={"kt-wizard-v1__nav-body"+ (activeStep>0 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon"+ (activeStep>0 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(1)}
                          >
                            <i className="flaticon-globe" />
                          </div>
                          <div className="kt-wizard-v1__nav-label">
                            2) Review and Submit
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  {/*end: Form Wizard Nav */}
                </div>

                {pageContent}

                <div className="kt-grid__item kt-grid__item--fluid kt-wizard-v1__wrapper">
                  {/*begin: Form Wizard Form*/}
                  <form className="kt-form" id="kt_form" noValidate="novalidate">

                    {/*begin: Form Wizard Step 1*/}
                    {activeStep === 0 && 
                    <div className="kt-wizard-v1__content">
                    <div className="kt-heading kt-heading--md">Tour Infomation</div>
                    <div className="kt-form__section kt-form__section--first">
                      <div className="kt-wizard-v1__form">

                      <div className="form-group">
                        <label>Name<span className={InputClasses.required}>*</span></label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        value={title}  
                        placeholder="Staff Name"
                        onChange={this.onChangeHandler}
                        />
                        <span className="form-text text-muted">Please enter Staff Name.</span>
                      </div>
                      
                    
                    <div className="form-group">
                        <label>Contact Number<span className={InputClasses.required}>*</span></label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="contactNo" 
                        name="contactNo" 
                        value={contactNo}  
                        placeholder="03030111111"
                        onChange={this.onChangeHandler}
                        />
                        <span className="form-text text-muted">Please enter Staff Contact Number.</span>
                      </div>
                      <div className="form-group">
                        <label>Email<span className={InputClasses.required}>*</span></label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={email}  
                        placeholder="Staff E-Mail"
                        onChange={this.onChangeHandler}
                        />
                        <span className="form-text text-muted">Please enter Staff Email.</span>
                      </div>

                       <div>
                      <div className="row">
                        <div className="col-xl-6">
                        <div className="form-group">
                        <label>Salary<span className={InputClasses.required}>*</span></label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="salary" 
                        name="salary" 
                        value={salary}  
                        placeholder="Staff monthly salary"
                        onChange={this.onChangeHandler}
                        />
                        <span className="form-text text-muted">Please enter monthly salary.</span>
                      </div>
                        </div>
                        <div className="col-xl-6">
                        <div className="form-group">
                        <label>Select Date Joined<span className={InputClasses.required}>*</span></label>
                        <input 
                        type='date'
                        className="form-control"
                        id="dateJoined" 
                        name="dateJoined" 
                        defaultValue={dateJoined} 
                        placeholder="Please Select staff joined date"
                        required
                        onChange={this.onChangeHandler}
                         />
                         
                      </div>
                        </div>
                      </div>
                    </div>
                    


                      <div className="form-group">
                        <label>Password<span className={InputClasses.required}>*</span></label>
                        <input 
                        type="Password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={password}  
                        placeholder="Staff Password"
                        onChange={this.onChangeHandler}
                        />
                        <span className="form-text text-muted">Please enter Staff Password.</span>
                      </div>
                      </div>
                    </div>
                  </div>
                    }
                    
                    {/*end: Form Wizard Step 1*/}

                    {/*begin: Form Wizard Step 2*/}
                    {activeStep === 1 && 
                    <div className="kt-wizard-v1__content">
                    <div className="kt-heading kt-heading--md">Review your Details and Submit</div>
                    <div className="kt-form__section kt-form__section--first">
                      <div className="kt-wizard-v1__review">
                        <div className="kt-wizard-v1__review-item">
                          <div className="kt-wizard-v1__review-title">
                            Staff Name
                          </div>
                          <div className="kt-wizard-v1__review-content">
                            {name}<br />
                          </div>
                        </div>
                       
                        <div className="kt-wizard-v1__review-item">
                          <div className="kt-wizard-v1__review-title">
                            Staff Email
                          </div>
                          <div className="kt-wizard-v1__review-content">
                            {email}<br />
                          </div>
                        </div>

                        <div className="kt-wizard-v1__review-item">
                          <div className="kt-wizard-v1__review-title">
                            Contact Number
                          </div>
                          <div className="kt-wizard-v1__review-content">
                            {contactNo}<br />
                          </div>
                        </div>

                        <div className="kt-wizard-v1__review-item">
                          <div className="kt-wizard-v1__review-title">
                            Salary
                          </div>
                          <div className="kt-wizard-v1__review-content">
                          Rs: {salary}<br />
                          </div>
                        </div>

                        <div className="kt-wizard-v1__review-item">
                          <div className="kt-wizard-v1__review-title">
                            Date Joined
                          </div>
                          <div className="kt-wizard-v1__review-content">
                            {dateJoined}<br />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                    }
                    {/*end: Form Wizard Step 2*/}

                    {/*begin: Form Actions */}
                    <div className="kt-form__actions">
                      
                      {activeStep === 1 && 
                      <div 
                      className="btn btn-secondary btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u"
                      onClick={() => this.onActiveStepHandler(0)}
                      >
                        Previous
                      </div>
                      }
                      {activeStep === 1 && 
                      <div 
                      className="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" 
                      onClick={this.onSubmit}
                      >
                        Submit
                      </div>
                      }

                     {activeStep === 0 &&
                      <div 
                      className="btn btn-brand btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" 
                      onClick={() => this.onActiveStepHandler(1)}
                      >
                        Next Step
                      </div>
                     }
                     
                    </div>
                    {/*end: Form Actions */}
                  </form>
                  {/*end: Form Wizard Form*/}
                </div>
              </div>
            </div>
          </div>
        </div>

      );
  }
}


const mapStateToProps = state => {
  return {
    page: state.page,
    errors: state.errors
  }
};


const mapDispatchToProps = dispatch => {
  return {
      onSubmit: (formData, history) => dispatch(actions.addStaff(formData, history)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewCustomer);