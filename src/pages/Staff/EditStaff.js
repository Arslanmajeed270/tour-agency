import React, { Component } from 'react';
import {connect} from 'react-redux';

import InputClasses from './Input.module.css';

import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';




// import{Alert } from 'react-bootstrap';
import Spinner from '../../components/common/Spinner';


class EditCustomer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading : false,

      id: '',
      name:'',
      email:'',
      contact_no:'',
      password:null,
      role: '',
      salary: '',
      dateJoined: new Date(),
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


  componentDidMount () {


    const id = this.props.match.params.id;
  
    this.props.onGetStaff(id)
      .then(res => {
  
       
          if(res.data){
  
            this.setState({

              id: id,
              name: res.data.name ? res.data.name : '',
              email: res.data.email ? res.data.email : '',
              contact_no: res.data.contact_no ? res.data.contact_no : '',
              role: res.data.role ? res.data.role : '',
              salary: res.data.salary ? res.data.salary : '',
              dateJoined: res.data.dateJoined ?  this.getDateFormat(res.data.dateJoined) : ''  
            });
  
          }
  
          this.props.onClearError();
      })
      .catch(err => {
  
          console.log("error is: ", err);
          let error = err && err.response && err.response.data ? err.response.data : {};
          this.props.onSetError(error);
  
      })      
      .finally(() => this.props.onClearLoading());
  
   }
  


  onActiveStepHandler = (current) => {
    this.setState({
      activeStep : current
    });
  }

  
 
  onChangeHandler = e => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    
    // console.log('targetName', targetName);
    // console.log('targetValue', targetValue);


		this.setState({
      [targetName]: targetValue,
      errors : {...this.state.errors,[targetName]:''}}
    );
  }




  onSubmit = (e) => {
    e.preventDefault();

    const {id, email, name, contact_no, password, role, salary, dateJoined} = this.state; 
  
     const formData = {
      id:id,
      email: email,
      name:name,
      contact_no: contact_no,
      password: password,
      role: role,
      salary: salary,
      dateJoined: dateJoined
    }
  
    this.props.onSubmit(formData, this.props.history);
  }


  getDateFormat = (day) => {
    const d = new Date();
    console.log("Checking Date: ", d.getDay());
   
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 
    console.log(`${mo} ${da}, ${ye}`);
    
    return (`${ye}-${mo}-${da}`);
}

  render() {

    const {
      loading,
      activeStep,

      email,
      name,
      contact_no,
      password,
      dateJoined,
      salary
       } = this.state;

    console.log("date checking: ", dateJoined);


    let pageContent = '';
    

    console.log("password:", password);

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

                      <div  className={"kt-wizard-v1__nav-item"+ (activeStep>=0 ? " is_active" : '')} >
                        <div className={"kt-wizard-v1__nav-body"+ (activeStep>=0 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon"+ (activeStep>=0 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(0)}
                          >
                            <i className="flaticon-list" />
                          </div>
                          <div className="kt-wizard-v1__nav-label">
                            1) Staff Information
                          </div>
                        </div>
                      </div>

                      <div  className={"kt-wizard-v1__nav-item"+ (activeStep>0 ? " is_active" : '')} >
                        <div className={"kt-wizard-v1__nav-body"+ (activeStep>0 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon"+ (activeStep>0 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(1)}
                          >
                            <i className="flaticon-responsive" />
                          </div>
                          <div className="kt-wizard-v1__nav-label">
                            2) Update Password
                          </div>
                        </div>
                      </div>

                      <div className={"kt-wizard-v1__nav-item"+ (activeStep>1 ? " is_active" : '')}  >
                        <div className={"kt-wizard-v1__nav-body"+ (activeStep>1 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon"+ (activeStep>1 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(2)}
                          >
                            <i className="flaticon-globe" />
                          </div>
                          <div className="kt-wizard-v1__nav-label">
                            3) Review and Submit
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
                    <div className="kt-heading kt-heading--md">Staff Infomation</div>
                    <div className="kt-form__section kt-form__section--first">
                      <div className="kt-wizard-v1__form">
                     
                      <div className="form-group">
                        <label>Staff Name<span className={InputClasses.required}>*</span></label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        defaultValue={name}  
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
                        id="contact_no" 
                        name="contact_no" 
                        value={contact_no}  
                        placeholder="03030111111"
                        onChange={this.onChangeHandler}
                        />
                        <span className="form-text text-muted">Please enter Staff Contact Number.</span>
                      </div>
                      <div className="form-group">
                        <label>Staff Email<span className={InputClasses.required}>*</span></label>
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
                        value={dateJoined} 
                        placeholder="Please Select staff joined date"
                        required
                        onChange={this.onChangeHandler}
                         />
                         
                      </div>
                        </div>
                      </div>
                    </div>
                    

                      </div>
                    </div>
                  </div>
                    }
                    
                    {/*end: Form Wizard Step 1*/}
                    
                    
                    {/*start: Form Wizard Step 2*/}
                      
                      {activeStep === 1 &&

                        <div className="kt-wizard-v1__content">
                        <div className="kt-heading kt-heading--md">Update Password</div>
                        <div className="kt-form__section kt-form__section--first">
                        <div className="kt-wizard-v1__form">
                        <div className="form-group">
                          <label>Update Password</label>
                          <input 
                          type="Password" 
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Update Password"
                          onChange={this.onChangeHandler}
                          />

                          <span className="form-text text-muted">Please update Password.</span>
                        </div>
                        </div>
                        </div>
                        </div>
                      }
                    
                    {/*end: Form Wizard Step 2*/}


                    {/*begin: Form Wizard Step 3*/}
                    {activeStep === 2 && 
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
                            {contact_no}<br />
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
                    {/*end: Form Wizard Step 3*/}

                    {/*begin: Form Actions */}
                    <div className="kt-form__actions">
                      
                      {activeStep > 0 && 
                      <div 
                      className="btn btn-secondary btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u"
                      onClick={() => this.onActiveStepHandler(activeStep-1)}
                      >
                        Previous
                      </div>
                      }
                      {activeStep === 2 && 
                      <div 
                      className="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" 
                      onClick={this.onSubmit}
                      >
                        Submit
                      </div>
                      }

                     {activeStep < 2 &&
                      <div 
                      className="btn btn-brand btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" 
                      onClick={() => this.onActiveStepHandler(activeStep+1)}
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
      onSubmit: (formData, history) => dispatch(actions.editStaff(formData, history)),
      onGetStaff: (id) => dispatch(actions.getStaffById(id)),
      onClearError: () => dispatch(actions.clearErrors()),
      onSetError: (error) => dispatch({type: actionTypes.SET_ERRORS, payload: error}),
      onClearLoading: () =>  dispatch(actions.clearPageLoading()),
      
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);