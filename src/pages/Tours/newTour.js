import React, { Component } from 'react';
import {connect} from 'react-redux';


import { addTour } from '../../store/tours/actions';

//importing forms
import Form1 from './form/Form1';
import Form2 from './form/Form2';
import Form3 from './form/Form3';
import Form4 from './form/Form4';

import ErrorModel from '../../components/common/errorModel';
import Spinner from '../../components/common/Spinner';


class NewProduct extends Component {
  
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
      tag: '',
      included: [{
        name: "",
        status: false,
        detail: "",
        image: ""
      }],
      plan: [],
      images: [],
      checkoutDestination: '',

      titleError: false,
      locationError:false,
      priceError:false,
      durationError:false,
      allowedPersonsError:false,
      imagesError:false,
      
      show: false,
      activeStep:1
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
    console.log(`checking current: `, current);
    const { activeStep } = this.state;
    if(current > activeStep){
      this.validate(current);
    }
    else{
      this.setState({
        activeStep: current
      });
    }
  }

  activeHandler  = () => {
    this.setState({
      show: true
    });
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  }

  validate = (current) => {
    
    let titleError = false;
    let locationError = false;
    let priceError = false;
    let durationError = false;
    let allowedPersonsError = false;
    let imagesError = false;
    
    let show = false;
    let activeStep = this.state.activeStep;

    const { 
    title,
    location,
    price,
    duration,
    allowedPersons,
    images,
    } = this.state;


    if( activeStep === 0 && 
      (!title || title === '')
      ){
      titleError = true;
      show = true;
    }
    if( activeStep === 0 && ( !location || location === "") ){
      locationError = true;
      show = true;
    }
    if( activeStep === 0 && (!price || price === 0) ){
      priceError = true;
      show = true;
    }
    if( activeStep === 0 && ( !duration || duration === '') ){
      durationError = true;
      show = true;
    }
    if( activeStep === 0 && ( !allowedPersons || allowedPersons === '' || (typeof allowedPersons === "string" && Number(allowedPersons) < 1 ) ) ){
      allowedPersonsError = true;
      show = true;
    }
    if( activeStep === 2 && (!images || images.length < 0)){
      imagesError = true;
      show = true;
    }

    if( !titleError &&
      !locationError &&
      !priceError &&
      !durationError &&
      !allowedPersonsError &&
      !imagesError ){
        activeStep = current;
    }
    
    this.setState({
      titleError,
      locationError,
      priceError,
      durationError,
      allowedPersonsError,
      imagesError,
      show,
      activeStep
    });

  }

  onImageHandler = (status,imgs) => {
    console.log("imgs: ", imgs); 
    const { images } = this.state;
    if(status === 'done')
    {
      images.push(imgs);
    }
    else if (status === 'removed'){
     const index =  images.findIndex(image => image.name === imgs.name);
     console.log("imgs.name: ", imgs.name);
     console.log("index: ", index);
     if(index >= 0)
      images.splice(index, 1);
    }
    this.setState({
      images
    });
  }


  addTagsHandler = () => {
    const { tag, tags } = this.state;
    if( tag !== "" ){
      tags.push(tag);
      this.setState({
        tag: "",
        tags
      });
    }
  }
 
  onChangeHandler = e => {
    const { name } = e.target;
    console.log('name', name);
    if(name === 'images'){
      this.setState({ images: e.target.files});
    }
    else if( name.indexOf('included') > 0 ){
      const { included } = this.state;
      const index = Number(name.split('-')[1]);
      const targetName = Number(name.split('-')[2]);
      included[index][targetName] = e.target.value;
      this.setState({
        included
      })
    }
    else{
      this.setState({[name]: e.target.value});
    }
  }

  removeElementHandler = (index, name) => {
      this.setState({
        [name]: [name].splice(index, 1)
      });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { 
      title, location, description, departure,
      returning, price, duration, allowedPersons, tags,
      included, plan, images, checkoutDestination 
    } = this.state;

    const { onAddTour, history } = this.props;

    console.log("into submit");

    var formData = new FormData();

    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("departure", departure);
    formData.append("returning", returning);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("allowedPersons", allowedPersons);
    formData.append("tags", tags);
    formData.append("included", included);
    formData.append("plan", plan);
    formData.append("checkoutDestination", checkoutDestination);


    console.log("images: ", images);
    if(images && images.length ){
      images.map(image => (
        formData.append("images", image, image.name)
      ));
    }
  
    console.log("formData", formData);
    
  
    // onAddTour(formData, history);
  }

  render() {

    const {
      loading,activeStep,
      
      title, location, description, departure,
      returning, price, duration, allowedPersons, tag, tags,
      included, plan, images, checkoutDestination,

      titleError, locationError, priceError, 
      durationError, allowedPersonsError, imagesError
    } = this.state;

    let pageContent = '';

    console.log('checking this.state: ', this.state);
    
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

                      <div to={"#"} className={"kt-wizard-v1__nav-item"+ (activeStep>=0 ? " is_active" : '') } >
                        <div className={"kt-wizard-v1__nav-body"+(activeStep>=0 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon" + (activeStep>=0 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(0)}
                          >
                            <i className="flaticon-information" />
                          </div>
                          <div className="kt-wizard-v1__nav-label" >
                            Tour Information
                          </div>
                        </div>
                      </div>

                      <div to={"#"} className={"kt-wizard-v1__nav-item"+ (activeStep>0 ? " is_active" : '') } >
                        <div className={"kt-wizard-v1__nav-body"+(activeStep>0 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon" + (activeStep>0 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(1)}
                          >
                            <i className="flaticon-price-tag" />
                          </div>
                          <div className="kt-wizard-v1__nav-label" >
                            2) Tags, Included & Plan
                          </div>
                        </div>
                      </div>


                      <div to={"#"} className={"kt-wizard-v1__nav-item"+ (activeStep>1 ? " is_active" : '') } >
                        <div className={"kt-wizard-v1__nav-body"+(activeStep>1 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon" + (activeStep>1 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(2)}
                          >
                            <i className="flaticon2-image-file" />
                          </div>
                          <div className="kt-wizard-v1__nav-label" >
                            3) Pictures
                          </div>
                        </div>
                      </div>

                      <div className={"kt-wizard-v1__nav-item"+ (activeStep>2 ? " is_active" : '')}  >
                        <div className={"kt-wizard-v1__nav-body"+ (activeStep>2 ? " is_active" : '')}>
                          <div 
                          className={"kt-wizard-v1__nav-icon"+ (activeStep>2 ? " is_active" : '')}
                          onClick={() => this.onActiveStepHandler(3)}
                          >
                            <i className="flaticon2-checkmark" />
                          </div>
                          <div className="kt-wizard-v1__nav-label">
                            4) Review and Submit
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
                  <form className="kt-form" id="kt_form" encType="multipart/form-data" noValidate="novalidate">

                    {/*begin: Form Wizard Step 1*/}
                    {activeStep === 0 && 
                      < Form1 
                      title={title}
                      description={description}
                      location={location}
                      departure={departure}
                      returning={returning}
                      price={price}
                      duration={duration}
                      allowedPersons={allowedPersons}
                      checkoutDestination={checkoutDestination}
                     
                      onChangeHandler={this.onChangeHandler}

                      titleError={titleError}
                      locationError={locationError}
                      priceError={priceError}
                      durationError={durationError}
                      allowedPersonsError={allowedPersonsError}
                      
                      />
                    }
                    
                    {/*end: Form Wizard Step 1*/}
                    
                    {/*begin: Form Wizard Step 2*/}

                    {activeStep === 1 &&
                        <Form2 
                        tags={tags}
                        tag={tag}
                        included={included}
                        plan={plan}

                        onChangeHandler={this.onChangeHandler}
                        addTagsHandler={this.addTagsHandler}

                        />
                    }

                    
                    {/*end: Form Wizard Step 2*/}



                    {/*begin: Form Wizard Step 3*/}
                    {activeStep === 2 &&
                      <Form3
                      onChangeHandler={(status, imgs) => this.onImageHandler(status, imgs)}
                      />
                    }
                    {/*end: Form Wizard Step 3*/}

                     {/*begin: Form Wizard Step 4*/}
                     {activeStep === 3 &&
                     <Form4 
                      title={title}
                      description={description}
                      location={location}
                      departure={departure}
                      returning={returning}
                      price={price}
                      duration={duration}
                      allowedPersons={allowedPersons}
                      checkoutDestination={checkoutDestination}
                      tags={tags}
                      included={included}
                      plan={plan}
                     />                     
                     }
                    {/*end: Form Wizard Step 4*/}


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
                      {activeStep === 3 && 
                      <div 
                      className="btn btn-success btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" 
                      onClick={this.onSubmit}
                      >
                        Submit
                      </div>
                      }

                     {activeStep < 3 &&
                      <div 
                      className="btn btn-brand btn-md btn-tall btn-wide kt-font-bold kt-font-transform-u" 
                      onClick={() => this.onActiveStepHandler(activeStep+1)}
                      >
                        Next Step
                      </div>
                     }
                      <ErrorModel show={this.state.show} handleClose={this.handleClose} />
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
    onAddTour: (formData, history) => dispatch(addTour(formData, history))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);