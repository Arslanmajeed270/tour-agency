import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link}  from 'react-router-dom';


import * as actions from '../../store/actions/index';

// import{Alert } from 'react-bootstrap';

import Spinner from '../../components/common/Spinner';

class ListStaff extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading : false,
      limit:10,
      offset:0,
      totalPages:0,
      staff:[],
      searchData:[]
    };
  }

  static getDerivedStateFromProps(props, state) {

    const {errors, page } = props;
    const staff= props.staff && props.staff.rows ? props.staff.rows: [];
    const totalPages = props.staff &&  props.staff.count ? props.staff.count : 0;
  

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

    if(staff && JSON.stringify(state.staff) !== JSON.stringify(staff)){
        
      changedState.staff = staff;
      stateChanged = true;
    }

    if(totalPages && JSON.stringify(state.totalPages) !== JSON.stringify(totalPages)){
        
      changedState.totalPages = totalPages;
      stateChanged = true;
    }

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

    this.props.onGetStaff(formData);
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
      this.props.onGetStaff(formData);
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
  
      this.props.onGetStaff(formData);
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
    console.log('targetName', targetName);
    console.log('targetValue', targetValue);


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
    this.props.onGetStaff(formData);
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
      this.props.onGetStaff(formData);
    });
  }
  deleteHandler = (id) => {
    this.props.onDelete(id);
  }

  getDateFormat = (day) => {
    const d = new Date(day);
    console.log("Checking Date: ", d.getDay());
   
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d) 
    console.log(`${mo} ${da}, ${ye}`);
    
    return (`${mo} ${da}, ${ye}`);
}

  render() {

    const {loading, offset, limit, totalPages, staff, searchData} = this.state;
    let pageContent = '';

    let pages = Math.ceil(totalPages/limit);
          
    console.log("staff: ", staff);
    console.log("searchData: ", searchData);

      if(loading){
        pageContent = <Spinner />
      }
      else{
        pageContent='';
      }

      return (
      <div className="kt-portlet kt-portlet--mobile" style={{margin: "30px"}}>
      <div className="kt-portlet__head kt-portlet__head--lg">
        <div className="kt-portlet__head-label">
          <span className="kt-portlet__head-icon">
            <i className="kt-font-brand flaticon2-line-chart" />
          </span>
          <h3 className="kt-portlet__head-title">
            Staff List
          </h3>
        </div>
        <div className="kt-portlet__head-toolbar">
          <div className="kt-portlet__head-wrapper">
            <div className="kt-portlet__head-actions">
              <Link to="/superadmin/new-staff" className="btn btn-brand btn-elevate btn-icon-sm">
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
              <table className="table table-striped table-bordered table-hover table-checkable dataTable dtr-inline collapsed"  style={{width: '1151px'}}>
                <thead>
                  <tr role="row">
                    <th className="sorting" rowSpan={1} colSpan={1} style={{width: '98.5px'}} >No.</th>
                    <th className="sorting"  rowSpan={1} colSpan={2} style={{width: '91.5px'}} >Name</th>
                    <th className="sorting"  rowSpan={1} colSpan={1} style={{width: '138.5px'}}>Email</th>
                    <th className="sorting"  rowSpan={1} colSpan={1} style={{width: '151.5px'}}>Contact No.</th>
                    <th className="sorting"  rowSpan={1} colSpan={1} style={{width: '151.5px'}}>Salary</th>
                    <th className="sorting"  rowSpan={1} colSpan={1} style={{width: '151.5px'}}>Date Joined</th>
                    <th className="sorting_disabled" rowSpan={1} colSpan={2} style={{width: '83.5px'}}>Actions</th>
                  </tr>

                  <tr className="filter disabled">
                    <th>
                      <input type="text" name="id" onBlur={this.onChangeHandler} className="form-control form-control-sm form-filter kt-input" />
                    </th>
                    <th colSpan={2}>
                      <input type="text" name="name" onBlur={this.onChangeHandler} className="form-control form-control-sm form-filter kt-input"  />
                    </th>
                    <th >
                      <input type="text" name="email"  onBlur={this.onChangeHandler} className="form-control form-control-sm form-filter kt-input"  />
                    </th>
                    <th >
                      <input type="text" name="contact_no"  onBlur={this.onChangeHandler} className="form-control form-control-sm form-filter kt-input" />
                    </th>
                    <th >
                      <input type="text" name="salary"  onBlur={this.onChangeHandler} className="form-control form-control-sm form-filter kt-input" />
                    </th>
                    <th >
                      {/* <input type="text" name="dateJoined"  onBlur={this.onChangeHandler} className="form-control form-control-sm form-filter kt-input" /> */}
                    </th>

                      <th colSpan='2' style={{textAlign: "center"}}>
                        <button onClick={this.onSearchHandler} className="btn btn-brand kt-btn btn-sm kt-btn--icon">
                           <span>
                             <i className="la la-search" />
                            <span>Search</span>
                          </span>
                        </button>
                        <button style={{marginTop:'0px'}} onClick={this.onResetHandler} className="btn btn-secondary kt-btn btn-sm kt-btn--icon">
                          <span>
                            <i className="la la-close" />
                            <span>Reset</span>
                          </span>
                        </button>
                      </th>
                    </tr>
                  </thead>
               <tbody>
                  {staff && staff.length ? staff.map((st, idx) =>(
                  <tr role="row" key={idx} className="odd">
                  <td>{st.userId && st.userId}</td>
                  <td colSpan='2'>{st.name && st.name}</td>
                  <td colSpan='1'>{st.email && st.email}</td>
                  <td colSpan='1'>{st.contact_no && st.contact_no}</td>
                  <td colSpan='1'>{st.salary && 'Rs: ' + st.salary}</td>
                  <td colSpan='1'>{st.dateJoined && this.getDateFormat(st.dateJoined) }</td>
                 
                  <td colSpan='2' style={{textAlign: 'center'}}>
                  <a href={`edit-staff-${st._id}`} className="btn btn-brand kt-btn btn-sm kt-btn--icon">
                         <span>
                           <i className="la la-edit" />
                          <span>Edit</span>
                        </span>
                      </a>
                      <button onClick={() => this.deleteHandler(st._id)} className="btn btn-danger kt-btn btn-sm kt-btn--icon">
                         <span>
                           <i className="la la-trash-o" />
                          <span>Delete</span>
                        </span>
                      </button>
                  </td>
                </tr>
                  ))
                  :
                  <tr>
                    <td colSpan="4"> No Data Found</td>
                  </tr>
                  }
                  
                </tbody> 
              </table>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div className="dataTables_info" >Showing {(offset*limit)+1} to { totalPages > limit ? (offset*limit)+limit : totalPages} of {totalPages} entries</div>
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
    staff: state.staff.staff,
    page: state.page,
    errors: state.errors
  }
};


const mapDispatchToProps = dispatch => {
  return {
      onGetStaff: (formData) => dispatch(actions.getStaff(formData)),
      onDelete: (id) => dispatch(actions.deleteStaff(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps )(ListStaff);