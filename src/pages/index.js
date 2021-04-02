import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Sidebar from '../components/UI/Sidebar';
import Header from '../components/header/Header';
import ContentHead from '../components/dashboard/ContentHead';
import MobileHeader from '../components/header/MobileHeader';
import Footer from '../components/UI/Footer';
import QuickPanel from '../components/UI/QuickPanel';

import Routes from './routes';


class Index extends Component {

  state = {
    sideBar: true,
    navHead: true,
    menuWrapper: true,
    navBar: true
  };


  sideBarHandler = () => {
    this.setState({
      sideBar: !this.state.sideBar
    });
  }

  navHeadHandler = () => {
    this.setState({
      navHead: !this.state.navHead
    });
  }

  menuWrapperHeadHandler = () => {
    this.setState({
      menuWrapper: !this.state.menuWrapper
    });
  }

  navBarHandler = () => {
    this.setState({
      navBar: !this.state.navBar
    });
  }  

  

  render() {

    const {sideBar, navHead, menuWrapper, navBar } = this.state;

      return (
      <div 
      className={"kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed"+(
        sideBar === false ? " kt-aside--minimize": "")+( navHead === false 
          ? " kt-header__topbar--mobile-on" :"")+( menuWrapper === false  
            ? " kt-header-menu-wrapper--on":"")+( navBar === false  ? " kt-aside--on":"")}
      >
        <Header 
          menuWrapperHeadHandler={this.menuWrapperHeadHandler} 
          menuWrapper={menuWrapper} 
          navHead={navHead}
        />
        <MobileHeader 
          navHead={navHead} 
          menuWrapper={menuWrapper} 
          navBar={navBar} 
          navHeadHandler={this.navHeadHandler} 
          menuWrapperHeadHandler={this.menuWrapperHeadHandler} 
          navBarHandler={this.navBarHandler} 
        />
        <QuickPanel />
        <Sidebar 
          active={this.props.active} 
          sideBar={sideBar} 
          sideBarHandler={this.sideBarHandler} 
          navBar={navBar}  
          navBarHandler={this.navBarHandler} 
        />

        <div className="kt-grid kt-grid--hor kt-grid--root">
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
              <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">


                <ContentHead 
                  title={this.props.active} 
                />
                
                <Routes />

                <Footer />



              </div>
            </div>
          </div>
          {/* begin::Scrolltop */}
          <div id="kt_scrolltop" className="kt-scrolltop">
            <i className="fa fa-arrow-up" />
          </div>
          {/* end::Scrolltop */}
          {/* begin::Sticky Toolbar */}
          <ul className="kt-sticky-toolbar" style={{marginTop: '30px'}}>
            <li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--success" id="kt_demo_panel_toggle" data-toggle="kt-tooltip" title="Check out more demos" data-placement="right">
              <Link to='/dashboard' >
                <i className="flaticon2-drop" />
              </Link>
            </li>
            <li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" data-toggle="kt-tooltip" title="Layout Builder" data-placement="left">
              <Link to='/dashboard'>
                <i className="flaticon2-gear" />
              </Link>
            </li>
            <li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--warning" data-toggle="kt-tooltip" title="Documentation" data-placement="left">
              <Link to='/dashboard'>
                <i className="flaticon2-telegram-logo" />
              </Link>
            </li>
          </ul>
          {/* end::Sticky Toolbar */}
        </div>
      </div>
    )
  }
}




export default Index;