import React, { Component } from 'react';
import {connect} from 'react-redux';

import Content from '../../components/dashboard/Content';

// import{Alert } from 'react-bootstrap';
import Spinner from '../../components/common/Spinner';


class Dashboard extends Component {
  
  state = {
      errors: {},
      loading : false
    };

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

  render() {

    const { loading } = this.state;
    let pageContent = '';

    
      if(loading){
        pageContent = <Spinner />
      }
      else{
      pageContent = (
          <div>
            <Content />
          </div>
        );
      }

      return pageContent;
  }
}


const mapStateToProps = state => {
  return {
    page: state.page,
    errors: state.errors
  }
};


export default connect(mapStateToProps)(Dashboard);