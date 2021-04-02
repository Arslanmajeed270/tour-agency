import React, { Component } from 'react';
import {connect} from 'react-redux';


// import * as actions from '../../store/actions/index';

//importing forms
import Form1 from './form/Form1';
import Form2 from './form/Form2';
import Form3 from './form/Form3';
import Form4 from './form/Form4';

// import ErrorModel from '../../components/common/errorModel';
// import{Alert } from 'react-bootstrap';
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
      included: [{
        name: "",
        status: false,
        detail: "",
        image: ""
      }],
      plan: [],
      images: [],
      checkoutDestination: '',
      

      nameError: false,
      quantityInStockError:false,
      productTypeError:false,
      companyError:false,
      costError:false,
      priceError:false,
      show: false,

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
    
    let nameError = false;
    let quantityInStockError = false;
    let productTypeError = false;
    let companyError = false;
    let costError = false;
    let priceError = false;
    
    let activeStep  = this.state.activeStep;
    let show = false;

    if(!this.state.name || this.state.name === ''){
      nameError = true;
      show = true;
    }
    if(!this.state.quantityInStock || this.state.quantityInStock === 0){
      quantityInStockError = true;
      show = true;
    }
    if(!this.state.productType || this.state.productType === ''){
      productTypeError = true;
      show = true;
    }
    if(!this.state.company || this.state.company === ''){
      companyError = true;
      show = true;
    }
    if(current > 1 && (!this.state.cost || this.state.cost === 0)){
      costError = true;
      show = true;
    }
    if(current > 1 &&  (!this.state.price || this.state.price === 0)){
      priceError = true;
      show = true;
    }

    if(activeStep === 1 && current > 1 && !nameError && !quantityInStockError && 
      !productTypeError && !companyError && !costError && !priceError){
      activeStep = current;
    }
    else if(activeStep === 0 && current > 0 &&  !nameError && !quantityInStockError && 
      !productTypeError && !companyError){
        activeStep = current;
    }
    else if(activeStep > 1){
      activeStep = current;
    }

    this.setState({
      nameError: nameError,
      quantityInStockError:quantityInStockError,
      productTypeError:productTypeError,
      companyError:companyError,
      costError:costError,
      priceError:priceError,
      activeStep: activeStep,
      show: show
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
  
 
  onChangeHandler = e => {
    const { name } = e.target;
    

    console.log('name', name);
    

    if(name === 'images'){
      this.setState({ images: e.target.files});
    }
    else{
      this.setState({[name]: e.target.value});

    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, location, description, departure, returning,
      price, duration, allowedPersons, tags, included, plan, 
      images, checkoutDestination } = this.state;

    console.log("into submit");

    var formdata = new FormData();

    formdata.append("title", title);
    formdata.append("location", location);
    formdata.append("description", description);
    formdata.append("departure", departure);
    formdata.append("returning", returning);
    formdata.append("checkoutDestination", checkoutDestination);
    formdata.append("price", price);
    formdata.append("duration", duration);
    formdata.append("allowedPersons", allowedPersons);
    formdata.append("tags", tags);
    formdata.append("included", included);
    formdata.append("plan", plan);


    console.log("images: ", images);
    if(images && images.length ){
      images.map(image => (
        formdata.append("images", image, image.name)
      ));
    }
  
    // console.log("formData", formdata);
    
  
    // this.props.onSubmit(formdata, this.props.history);


  }

  render() {

    const {
      loading,activeStep,
      
      title, location, description, departure, returning,
        images, checkoutDestination,

      nameError, quantityInStockError, productTypeError,
      companyError, costError, priceError,
    } = this.state;

    let pageContent = '';
    console.log("images: ", images);
    console.log("companies: ", companies);

    
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
                            1) Product Information
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
                            2) Prices
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
                {/* <ErrorModel show={this.state.show} handleClose={this.handleClose} /> */}

                <div className="kt-grid__item kt-grid__item--fluid kt-wizard-v1__wrapper">
                  {/*begin: Form Wizard Form*/}
                  <form className="kt-form" id="kt_form" encType="multipart/form-data" noValidate="novalidate">

                    {/*begin: Form Wizard Step 1*/}
                    {activeStep === 0 && 
                      < Form1 
                      name={name} 
                      status={status}
                      quantityInStock={quantityInStock} 
                      productType={productType}
                      company={company}
                      sku={sku}
                      recUsageLimit={recUsageLimit}
                      recUsageLimitUnit={recUsageLimitUnit} 
                      description={description}
                      apiGrade={apiGrade}
                      packagingSize={packagingSize}
                      packagingSizeUnit={packagingSizeUnit}
                      companies={companies}
                      onChangeHandler={this.onChangeHandler}

                      nameError={nameError}
                      quantityInStockError={quantityInStockError}
                      productTypeError={productTypeError}
                      companyError={companyError}
                      
                      />
                    }
                    
                    {/*end: Form Wizard Step 1*/}
                    
                    {/*begin: Form Wizard Step 2*/}

                    {activeStep === 1 &&
                        <Form2 
                        cost={cost} 
                        price={price}
                        salePrice={salePrice}
                        saleStartDate={saleStartDate} 
                        saleEndDate={saleEndDate}
                        onChangeHandler={this.onChangeHandler}

                        costError={costError}
                        priceError={priceError}
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
                      name={name} 
                      status={status}
                      quantityInStock={quantityInStock} 
                      productType={productType}
                      company={company}
                      sku={sku}
                      recUsageLimit={recUsageLimit}
                      recUsageLimitUnit={recUsageLimitUnit} 
                      description={description}
                      cost={cost} 
                      price={price}
                      salePrice={salePrice}
                      saleStartDate={saleStartDate} 
                      saleEndDate={saleEndDate}
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
    // companies: state.company.companies,
    page: state.page,
    errors: state.errors
  }
};


const mapDispatchToProps = dispatch => {
  return {
    // onGetCompanies: (formData) => dispatch(actions.getCompanies(formData)),
    // onSubmit: (formData, history) => dispatch(actions.addProduct(formData, history))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);