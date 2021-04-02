import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link}  from 'react-router-dom';


// import * as actions from '../../store/actions/index';

// import{Alert } from 'react-bootstrap';

import Spinner from '../../components/common/Spinner';
import Model from './model';

class ListCompany extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading : false,
      limit:10,
      offset:0,
      totalPages:0,
      products:[],
      companies:[],
      searchData:[],
      show: false
    };
  }

  static getDerivedStateFromProps(props, state) {

    const {errors, page } = props;
    // const products = props.product && props.product.rows ? props.product.rows: [];
    // const totalPages = props.product &&  props.product.count ? props.product.count : 0;
    // const companies = props.companies && props.companies.rows ? props.companies.rows: [];
    
  

    let stateChanged = false;
    let changedState = {};

    // if(companies && JSON.stringify(state.companies) !== JSON.stringify(companies)){
        
    //   changedState.companies = companies;
    //   stateChanged = true;
    // }

    if(errors && JSON.stringify(state.errors) !== JSON.stringify(errors)){
        
      changedState.errors = errors;
      stateChanged = true;
    }

    if(page && JSON.stringify(state.loading) !== JSON.stringify(page.loading)){
      changedState.loading = page.loading;  
      stateChanged = true;
    }

    // if(products && JSON.stringify(state.products) !== JSON.stringify(products)){
        
    //   changedState.products = products;
    //   stateChanged = true;
    // }

    // if(totalPages && JSON.stringify(state.totalPages) !== JSON.stringify(totalPages)){
        
    //   changedState.totalPages = totalPages;
    //   stateChanged = true;
    // }

    if(stateChanged){
      return changedState;
    }
    return null;
  }

  componentDidMount(){
    
    const formData = {
      offset: this.state.offset,
      limit: this.state.limit,
      searchData: this.state.searchData
    }

    // this.props.onGetProducts(formData);
    // this.props.onGetCompanies(formData);
  }

  handleClose = () => {
    this.setState({
      show: false
    });

  }

  handleShow = (product) => {
    this.setState({
      show: true,
      product: product
    });

  }


  pagnationHandler = (offset, limit) => {

    console.log("pagnationHandler Offset: ", offset);
    console.log("pagnationHandler limit: ", limit);
    this.setState({
      offset: offset
    },() => {
      const formData = {
        offset: offset,
        limit: limit,
        searchData: this.state.searchData
      }
      this.props.onGetProducts(formData);
    }
    );
  }

  onLimitChangeHandler = (e) => {
    // const targetName = e.target.name;
    const limit = parseInt(e.target.value, 10);
    const offset = this.state.offset;
    // console.log("targetName", targetName);
    this.setState({
      limit: limit,
      offset:0
    }, ()=> {
      const formData = {
        offset: offset,
        limit: limit,
        searchData: this.state.searchData
      }
  
      this.props.onGetProducts(formData);
    });
  }

  onChangeHandler = (e) => {

    const targetName = e.target.name;
    const targetValue = e.target.value;
    let check=false;
    const newSearchData = this.state.searchData;
    if(newSearchData && newSearchData.length){
      let index = newSearchData.findIndex(data => data.key === targetName);
      console.log("index:", index);
        if(index >=0){
          console.log("into if");
          newSearchData[index].value = targetValue;
          check = true;
        }
    }
    if(!check){
      newSearchData.push({
        key: targetName,
        value: targetValue
      });  
    }
    // console.log('targetName', targetName);
    // console.log('targetValue', targetValue);


		this.setState({
      searchData : newSearchData,
      errors : {...this.state.errors,[targetName]:''}},

    );
  }

  onSearchHandler = () => {
    const formData = {
      offset: this.state.offset,
      limit: this.state.limit,
      searchData: this.state.searchData
    }
    this.props.onGetProducts(formData);
  }

  onResetHandler = () => {
    this.setState({
      offset: 0,
      limit: 10,
      searchData: []
    }, () => {
      const formData = {
        offset: this.state.offset,
        limit: this.state.limit,
        searchData: this.state.searchData
      }
      this.props.onGetProducts(formData);
    });
  }

  getDateFormat = (date) => {
    const d = new Date(date)
  const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
  const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 
  console.log(`${mo} ${da}, ${ye}`);

  return (`${mo} ${da}, ${ye}`);
  
  }

  render() {

    const {loading, offset, limit, totalPages, products, searchData, companies, show, product} = this.state;
    let pageContent = '';

    let pages = Math.ceil(totalPages/limit);
    let backendServerURL = process.env.REACT_APP_API_URL;
          
    console.log("products: ", products);
    console.log("searchData: ", searchData);


      if(loading){
        pageContent = <Spinner />
      }
      else{
        pageContent=<Model show={show} product={product} getDateFormat={this.getDateFormat} handleClose={this.handleClose} />;
      }

      return (
      <div className="kt-portlet kt-portlet--mobile" style={{margin: "30px"}}>
      <div className="kt-portlet__head kt-portlet__head--lg">
        <div className="kt-portlet__head-label">
          <span className="kt-portlet__head-icon">
            <i className="kt-font-brand flaticon2-line-chart" />
          </span>
          <h3 className="kt-portlet__head-title">
            Products
          </h3>
        </div>
        <div className="kt-portlet__head-toolbar">
          <div className="kt-portlet__head-wrapper">
            <div className="kt-portlet__head-actions">
              <Link to={"/new-product"} className="btn btn-brand btn-elevate btn-icon-sm">
                <i className="la la-plus" />
                New Record
              </Link>
            </div>	
          </div>		
        </div>
      </div>
      {pageContent}
      <div className="kt-portlet__body">
        {/*begin: Datatable */}
        <div id="kt_table_1_wrapper" className="dataTables_wrapper dt-bootstrap4">

        <div className="row">
      <div className="col-sm-12">
      <table className="table table-striped table-bordered table-hover table-checkable dataTable no-footer"  style={{width: '1151px'}}>
      <thead>
         <tr role="row">
           <th className="filterhead sorting_desc" width="5%"  rowSpan={1} colSpan={1} style={{width: '16.25px'}}>ID</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '47.25px'}}>Name</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '56.25px'}}>SKU</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '62.25px'}}>In Stock Quantity</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '58.25px'}}>Product Cost</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '58.25px'}}>Product Price</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '52.25px'}}>Packing Size</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '102.25px'}}>Recommended Usage</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '66.25px'}}>Company</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '52.25px'}}>Product Type</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '42.25px'}}>Status</th>
           <th className="filterhead sorting"  rowSpan={1} colSpan={1}  style={{width: '49.25px'}}>Actions</th></tr>
         <tr className="filter" role="row">
            <td rowSpan={1} colSpan={1}>
              {/* <input type="number" name="No" className="form-control form-control-sm kt-input form-filter"  /> */}
              </td>
            <td rowSpan={1} colSpan={1}><input type="text" name="name" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter"  /></td>
            <td rowSpan={1} colSpan={1}><input type="text" name="sku"  onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter"  /></td>
            <td rowSpan={1} colSpan={1}><input type="number" name="quantityInStock" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter"  /></td>
            <td rowSpan={1} colSpan={1}><input type="number" name="cost"  onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter"  /></td>
            <td rowSpan={1} colSpan={1}><input type="number" name="price" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter"  /></td>
            <td rowSpan={1} colSpan={1}>
               <select name="packagingSize"  onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter" >
                  <option value>All Sizes</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={300}>300</option>
                  <option value={400}>400</option>
                  <option value={500}>500</option>
               </select>
               <select name="packagingSizeUnit" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter" >
                  <option value>All units</option>
                  <option value="L">Litre</option>
                  <option value="ml"> Mili-Litre (ml)</option>
                  <option value="KG">Kilogram</option>
                  <option value="g">Gram</option>
               </select>
            </td>
            <td rowSpan={1} colSpan={1}>
               <select name="recUsageLimit" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter" >
                  <option value>All</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                  <option value={300}>300</option>
                  <option value={400}>400</option>
                  <option value={500}>500</option>
                  <option value={1000}>1000</option>
                  <option value={2000}>2000</option>
                  <option value={3000}>3000</option>
                  <option value={4000}>4000</option>
                  <option value={5000}>5000</option>
                  <option value={6000}>6000</option>
                  <option value={7000}>7000</option>
                  <option value={8000}>8000</option>
                  <option value={9000}>9000</option>
                  <option value={10000}>10000</option>
               </select>
               <select name="recUsageLimitUnit" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter" >
                  <option value>All</option>
                  <option value="K">Kilometers</option>
                  <option value="D">Days</option>
                  <option value="Mon">Months</option>
                  <option value="Y">Years</option>
               </select>
            </td>
            <td rowSpan={1} colSpan={1}>
               <select name="company" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter" >
                  <option value>All</option>
                  {companies && companies.length && companies.map(company => (
                  <option key={company._id} value={company.name}>{company.name}</option>
                  ))}
               </select>
            </td>
            <td rowSpan={1} colSpan={1}>
               <select name="productType" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter" >
                  <option value=''>All</option>
                  <option value={"oil"}>Oil</option>
                  <option value="Filters">Filters</option>
                  <option value="Accessories">Accessories</option>
               </select>
            </td>
            <td rowSpan={1} colSpan={1}>
               <select name="status" onBlur={this.onChangeHandler} className="form-control form-control-sm kt-input form-filter" >
                  <option value=''>All</option>
                  <option value={true}>Active</option>
                  <option value={false}>InActive</option>
               </select>
            </td>
            <td rowSpan={1} colSpan={1}>
               <button onClick={this.onSearchHandler} className="search btn btn-brand kt-btn btn-sm kt-btn--icon">
               <span><i className="la la-search" /><span>Search</span></span>
               </button>
               <button onClick={this.onResetHandler} className="reset btn btn-secondary kt-btn btn-sm kt-btn--icon" style={{marginTop: 0}}>
               <span><i className="la la-close" /><span>Reset</span></span>
               </button>
            </td>
         </tr>
      </thead>
      <tbody>
        {products && products.length ? products.map((product, idx) =>(
         <tr key={idx} role="row" className="odd">
            <td className="sorting_1">{(offset*limit)+idx+1} 
            {product.images && product.images.length &&
              <img src={`${backendServerURL}/images/${product.images[0]}`} alt={product.images[0]} style={{maxWidth: '32px', maxHeight: '32px', paddingLeft: '8px'}} />
            }
            </td>
            <td>{product.name}</td>
            <td>{product.sku}</td>
          <td><span style={{color: 'green'}}>{product.quantityInStock}</span></td>
          <td>{product.cost}</td>
            <td>
              {product.salePrice && product.salePrice > 0  && product.saleStartDate && new Date(product.saleStartDate).getTime() <= new Date().getTime() ?
                <span className="kt-option__label">                        
                
                  <span id="price_saleprice3" className="kt-option__body">                            
                    <font style={{color: 'red'}}>
                      <strike>Rs. {product.price}</strike>
                    </font>                            
                    <br />                           
                    <font style={{color: 'green'}}>Rs. {product.salePrice}</font>                            
                    <span style={{float: 'right', background: 'green', color: 'white', borderRadius: '20px', padding: '2px 2px', fontSize: '9px'}}>Sale </span>                                                    
                    <br /><br />
                      {product.saleStartDate && product.saleEndDate ?
                      <span style={{fontSize: '11px'}}>   
                        <font style={{color: 'green'}}>Sale Started: </font> {this.getDateFormat(product.saleStartDate)}<br /> 
                        <font style={{color: 'red'}}>Sale End: </font> {this.getDateFormat(product.saleEndDate)}
                      </span>  
                      :
                      <span>  
                      </span>
                      }
                    </span>
                    </span>
              :
              <span>Rs. {product.price}</span>
              }
             
              </td>
            <td>{product.packagingSize} {product.packagingSizeUnit}</td>
            <td>{product.recUsageLimit} {product.recUsageLimitUnit}</td>
            <td>{product.company}</td>
            <td>{product.productType}</td>
            <td>
              <span className={"kt-badge kt-badge--inline kt-badge--pill"+(product.status ? ' kt-badge--success' : ' kt-badge--danger')}>
                {product.status ? 'Active' : 'Inactive'}
                </span></td>
                
            <td><div onClick={() =>  this.handleShow(product)} className="btn btn-sm btn-clean btn-icon btn-icon-md" title="View Product Details"><i className="la la-eye" /></div> 
            <a href={`edit-product-${product._id}`} className="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit Product"><i className="la la-edit" /></a></td>
         </tr>
        ))
        :
        <tr>
          <td colSpan="13"> No Data Found</td>
        </tr>
  }
         
        </tbody>
      </table><div id="datatable_ajax_processing" className="dataTables_processing card" style={{display: 'none'}}>Processing...
   </div>
</div>
</div>
         


            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div className="dataTables_info" >Showing {(offset*limit)+1} to { totalPages > (offset*limit)+limit ? (offset*limit)+limit : totalPages} of {totalPages} entries</div>
              </div>
              <div className="col-sm-12 col-md-7 dataTables_pager">
                <div className="dataTables_length">
                  <label >Display
                    <select  className="custom-select custom-select-sm form-control form-control-sm" onClick={this.onLimitChangeHandler} defaultValue={limit}>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </label>
                </div>
                <div className="dataTables_paginate paging_simple_numbers" >
                  <ul className="pagination">
                    {offset > 5 &&
                    <li className="paginate_button page-item previous" onClick={()=> this.pagnationHandler(0, limit)}><Link to="#"  className="page-link" ><i className="la la-angle-double-left" /></Link></li>
                    }
                    {offset > 0 &&
                    <li className="paginate_button page-item previous" onClick={()=> this.pagnationHandler(offset-1, limit)}><Link to="#"  className="page-link" ><i className="la la-angle-left" /></Link></li>
                    }
                    {offset > 2 &&
                    <li className="paginate_button page-item previous" ><Link to="#"  className="page-link" >...</Link></li>
                    }
                    {offset > 1 &&
                    <li className="paginate_button page-item "onClick={()=> this.pagnationHandler(offset-2, limit)}><Link to="#"  className="page-link">{offset-1}</Link></li>
                    }
                    {offset > 0 &&
                    <li className="paginate_button page-item "onClick={()=> this.pagnationHandler(offset-1, limit)}><Link to="#"  className="page-link">{offset}</Link></li>
                    }
                    {
                    <li className="paginate_button page-item active"><Link to="#"  className="page-link">{offset+1}</Link></li>
                    }
                    {pages > offset+1 &&
                    <li className="paginate_button page-item "onClick={()=> this.pagnationHandler(offset+1, limit)}><Link to="#"  className="page-link">{offset + 2}</Link></li>
                    }
                    {pages > offset+2 &&
                    <li className="paginate_button page-item "onClick={()=> this.pagnationHandler(offset+2, limit)}><Link to="#"  className="page-link">{offset + 3}</Link></li>
                    }
                    {pages > offset+2 &&
                    <li className="paginate_button page-item" ><Link to="#" className="page-link">...</Link></li>
                    }
                    {pages > offset + 1 &&
                    <li className="paginate_button page-item next" onClick={()=> this.pagnationHandler(offset+1, limit)}><Link to="#" className="page-link"><i className="la la-angle-right" /></Link></li>
                    }
                    {pages > offset+2 &&
                    <li className="paginate_button page-item next" onClick={()=> this.pagnationHandler(pages, limit)}><Link to="#" className="page-link"><i className="la la-angle-double-right" /></Link></li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        {/*end: Datatable */}
      </div>
    </div>
    
      );

  }
}


const mapStateToProps = state => {
  return {
    // companies: state.company.companies,
    // product: state.product.products,
    page: state.page,
    errors: state.errors
  }
};


const mapDispatchToProps = dispatch => {
  return {
      // onGetProducts: (formData) => dispatch(actions.getProducts(formData)),
      // onGetCompanies: (formData) => dispatch(actions.getCompanies(formData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps )(ListCompany);