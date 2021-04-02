import React, { Component } from 'react';
import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index';
// import * as actionTypes from '../../store/actions/actionTypes';

//importing forms
import Form1 from './form/Form1';
import Form2 from './form/Form2';
import Form3 from './form/Form3';
import Form4 from './form/Form4';

// import{Alert } from 'react-bootstrap';
// import ErrorModel from '../../components/common/errorModel';
import Spinner from '../../components/common/Spinner';


class EditProduct extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading : false,
     
      id: '',
      name: '',
      sku: '',
      quantityInStock: '',
      description: '',
      cost: '',
      price: '',
      salePrice: '',
      saleStartDate: '',
      saleEndDate: '',
      apiGrade: '',
      packagingSize: '',
      packagingSizeUnit: '',
      recUsageLimit: '',
      recUsageLimitUnit: '',
      company: '',
      status: true,
      productType: '',
      images:[],

      currentImage: [],
      
      companies: [],

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
    const companies = props.companies && props.companies.rows ? props.companies.rows: [];

    

    let stateChanged = false;
    let changedState = {};

    if(companies && JSON.stringify(state.companies) !== JSON.stringify(companies)){
        
      changedState.companies = companies;
      stateChanged = true;
    }

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
    const formData = {};
  
    this.props.onGetProduct(id)
      .then(res => {       
          if(res.data){

            console.log("Response of onGetProduct: ", res.data);

            this.setState({
              id: res.data && res.data._id && res.data._id,
              name: res.data && res.data.name && res.data.name,
              sku: res.data && res.data.sku && res.data.sku,
              quantityInStock: res.data && res.data.quantityInStock && res.data.quantityInStock,
              description: res.data && res.data.description && res.data.description,
              cost: res.data && res.data.cost && res.data.cost,
              price: res.data && res.data.price && res.data.price,
              salePrice: res.data && res.data.salePrice && res.data.salePrice,
              saleStartDate: res.data && res.data.saleStartDate && res.data.saleStartDate,
              saleEndDate: res.data && res.data.saleEndDate && res.data.saleEndDate,
              apiGrade: res.data && res.data.apiGrade && res.data.apiGrade,
              packagingSize: res.data && res.data.packagingSize && res.data.packagingSize,
              packagingSizeUnit: res.data && res.data.packagingSizeUnit && res.data.packagingSizeUnit,
              recUsageLimit: res.data && res.data.recUsageLimit && res.data.recUsageLimit,
              recUsageLimitUnit: res.data && res.data.recUsageLimitUnit && res.data.recUsageLimitUnit,
              company: res.data && res.data.company && res.data.company,
              status: res.data && res.data.status,
              productType: res.data && res.data.productType && res.data.productType,
              images:res.data && res.data.images && res.data.images,
              
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

      this.props.onGetCompanies(formData);
  
   }

 
   onActiveStepHandler = (current) => {
    if(current > this.state.activeStep){
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
    const currentImage = this.state.currentImage;
    if(status === 'done')
    {
      currentImage.push(imgs);
    }
    else if (status === 'removed'){
     const index =  currentImage.findIndex(image => image.name === imgs.name);
     console.log("imgs.name: ", imgs.name);
     console.log("index: ", index);
     if(index >= 0)
     currentImage.splice(index, 1);
    }
    this.setState({
      currentImage: currentImage
    });
  }

  imgRemoveHandler = (index) => {
    let updatedImages = this.state.images;

    updatedImages.splice(index,1);
    this.setState({
      images: updatedImages
    });
  }

 
 
  onChangeHandler = e => {
    const targetName = e.target.name;
    // const targetValue = e.target.value;

    console.log('targetName', targetName);
    
      this.setState({[e.target.name]: e.target.value});

  }

  onSubmit = (e) => {
    e.preventDefault();

    const {id, name, sku, quantityInStock, description, cost, price, salePrice, 
      saleStartDate, saleEndDate,apiGrade, packagingSize,packagingSizeUnit, recUsageLimit,
      recUsageLimitUnit, company, status, productType, images, currentImage } = this.state; 

    console.log("into submit");

    var formdata = new FormData();

    formdata.append("id", id);
    formdata.append("name", name);
    formdata.append("sku", sku);
    formdata.append("quantityInStock", quantityInStock);
    formdata.append("description", description);
    formdata.append("cost", cost);
    formdata.append("price", price);
    formdata.append("salePrice", salePrice);
    formdata.append("saleStartDate", saleStartDate);
    formdata.append("saleEndDate", saleEndDate);
    formdata.append("apiGrade", apiGrade);
    formdata.append("packagingSize", packagingSize);
    formdata.append("packagingSizeUnit", packagingSizeUnit);
    formdata.append("recUsageLimit", recUsageLimit);
    formdata.append("recUsageLimitUnit", recUsageLimitUnit);
    formdata.append("company", company);
    formdata.append("status", status);
    formdata.append("productType", productType);

    if(images && images.length ){
      images.map(image => (
        formdata.append("old", image)
      ));
    }
    if(currentImage && currentImage.length ){
      currentImage.map(image => (
        formdata.append("images", image, image.name)
      ));
    }

  
    console.log("formData", formdata);
    
  
    this.props.onSubmit(formdata, this.props.history);


  }

  render() {

    const {
      loading,
      activeStep,

      name, sku, quantityInStock, description, cost, price, salePrice, 
      saleStartDate, saleEndDate,apiGrade, packagingSize,packagingSizeUnit, recUsageLimit,
      recUsageLimitUnit, company, status, productType, images,
      companies,

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
                      edit={true}
                      images={images}
                      imgRemoveHandler={(img) => this.imgRemoveHandler(img)}
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
                      apiGrade={apiGrade}
                      packagingSize={packagingSize}
                      packagingSizeUnit={packagingSizeUnit}
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
    companies: state.company.companies,
    page: state.page,
    errors: state.errors
  }
};


const mapDispatchToProps = dispatch => {
  return {
    // onGetCompanies: (formData) => dispatch(actions.getCompanies(formData)),
    // onSubmit: (formData, history) => dispatch(actions.editProduct(formData, history)),
    // onGetProduct: (id) => dispatch(actions.getProductById(id)), 
    // onClearError: () => dispatch(actions.clearErrors()),
    // onSetError: (error) => dispatch({type: actionTypes.SET_ERRORS, payload: error}),
    // onClearLoading: () =>  dispatch(actions.clearPageLoading()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);